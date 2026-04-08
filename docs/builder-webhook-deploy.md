# Builder.io Webhook → GitHub Pages Auto-Deploy

Automatically rebuild your GitHub Pages site when content is published in Builder.io.

## Overview

Since GitHub Pages only serves static files, content changes require a rebuild. This setup uses a Cloudflare Worker as a lightweight proxy to trigger a GitHub Actions workflow whenever Builder publishes content.

**Flow:** Builder publishes → Cloudflare Worker → GitHub Actions `repository_dispatch` → Astro build → GitHub Pages deploy

---

## 1. GitHub Personal Access Token

1. Go to **github.com/settings/tokens?type=beta** (fine-grained tokens)
2. Click **Generate new token**
3. Under **Repository access** → select **Only select repositories** → pick your repo
4. Under **Repository permissions** set:
   - **Actions** → Read and write
   - **Contents** → Read and write
5. Generate and copy the token

---

## 2. GitHub Actions Workflow

Add `repository_dispatch` to your existing workflow triggers:

```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [builder_publish]
```

Commit and push to `main`.

---

## 3. Cloudflare Worker

1. Go to [cloudflare.com](https://cloudflare.com) and create a free account
2. Go to **Workers & Pages → Create → Create Worker**
3. Name it (e.g. `builder-webhook-proxy`) and click **Deploy**
4. Click **Edit code** and replace all content with:

```js
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const secret = url.searchParams.get('secret');

    if (secret !== env.WEBHOOK_SECRET) {
      return new Response('Unauthorized', { status: 401 });
    }

    const res = await fetch(
      'https://api.github.com/repos/<owner>/<repo>/dispatches',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.GITHUB_TOKEN}`,
          Accept: 'application/vnd.github+json',
          'Content-Type': 'application/json',
          'User-Agent': 'builder-webhook-proxy',
        },
        body: JSON.stringify({ event_type: 'builder_publish' }),
      }
    );

    return new Response(res.ok ? 'OK' : await res.text(), { status: res.status });
  },
};
```

Replace `<owner>/<repo>` with your GitHub username and repo name. Click **Deploy**.

5. Go to **Settings → Variables and Secrets** and add:
   - `GITHUB_TOKEN` → your token from step 1
   - `WEBHOOK_SECRET` → a random secret string (generate one with `openssl rand -hex 20`)

---

## 4. Builder.io Webhook

1. Go to **Builder Space Settings → Webhooks → Add webhook**
2. Set the URL to:
   ```
   https://builder-webhook-proxy.<your-subdomain>.workers.dev?secret=<your-webhook-secret>
   ```
3. Under **Events** check **Publish content**
4. Click **Save**

---

## Testing

Send a test request via cURL:

```bash
curl -i -X POST "https://builder-webhook-proxy.<your-subdomain>.workers.dev?secret=<your-secret>"
```

A successful response returns `OK` with status `200`. You should then see a new workflow run appear in your GitHub repo's **Actions** tab within a few seconds.

You can also use the **Send test** button in Builder's webhook settings.

---

## Troubleshooting

| Issue | Fix |
|---|---|
| `401 Unauthorized` | Secret mismatch — check `WEBHOOK_SECRET` in Cloudflare matches the URL param exactly |
| `403 Resource not accessible` | Token missing **Contents: Read and write** permission |
| `404 Not Found` | Wrong `<owner>/<repo>` in Worker code — must match your GitHub URL exactly (case-sensitive) |
| No Actions run triggered | Ensure `repository_dispatch` trigger is committed and pushed to `main` |

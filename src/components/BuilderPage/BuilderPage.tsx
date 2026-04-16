import { Content, isPreviewing, type BuilderContent } from "@builder.io/sdk-react";

interface BuilderPageProps {
  content: BuilderContent | null;
  apiKey: string;
  model: string;
}

export function BuilderPage({ content, apiKey, model }: BuilderPageProps) {
  if (!content && !isPreviewing()) {
    return <div>404 - Page not found</div>;
  }

  return (
    <Content
      content={content}
      model={model}
      apiKey={apiKey}
    />
  );
}

// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  site: 'https://jasonyangcis.github.io',
  base: 'builder-astro-react-gen-2',
  devToolbar: { enabled: false },
});

import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import { optimizeCss } from 'carbon-preprocess-svelte';

const config: UserConfig = {
    plugins: [sveltekit(), process.env.NODE_ENV === 'production' && optimizeCss()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: '@use "src/variables.scss" as *;',
            },
        },
    },
    build: {
        rollupOptions: {
            external: ['chalk']
        }
    }
};

export default config;

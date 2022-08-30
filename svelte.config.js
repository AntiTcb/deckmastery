import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';
import { optimizeImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            scss: {
                prependData: '@use "src/variables.scss" as *;',
            },
        }),
        optimizeImports(),
    ],
    kit: {
        adapter: adapter(),
        alias: {
            $components: 'src/lib/components',
            $layouts: 'src/lib/layouts',
            $utils: 'src/lib/utils',
            $supabase: 'src/lib/utils/supabase.ts',
        },
    },
};

export default config;

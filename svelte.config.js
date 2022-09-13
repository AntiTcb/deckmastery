import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
    // Consult https://github.com/sveltejs/svelte-preprocess
    // for more information about preprocessors
    preprocess: [
        preprocess({
            postcss: true,
        }),
    ],
    kit: {
        adapter: adapter(),
        alias: {
            $components: 'src/lib/components',
            $layouts: 'src/lib/layouts',
            $utils: 'src/lib/utils',
            $supabase: 'src/lib/utils/supabase.ts',
            $lucia: 'src/lib/utils/lucia.ts',
        },
    },
};

export default config;

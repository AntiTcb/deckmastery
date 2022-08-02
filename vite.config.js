import { sveltekit } from '@sveltejs/kit/vite';

/** @type {import('vite').UserConfig} */
const config = {
    plugins: [sveltekit()],
    resolve: {
        alias: {
            $components: 'src/lib/components',
            $utils: 'src/lib/utils',
            $stores: 'src/lib/stores/',
            $db: 'src/lib/utils/db',
        }
    }
    // css: {
    //     preprocessorOptions: {
    //         scss: {
    //             additionalData: '@use "src/variables.scss" as *;'
    //         }
    //     }
    // }
};

export default config;

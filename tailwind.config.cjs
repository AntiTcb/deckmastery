const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const skeleton = require('@brainandbones/skeleton/tailwind/theme.cjs');

const config = {
    content: [
        './src/**/*.{html,js,svelte,ts}',
        './node_modules/@brainandbones/skeleton/**/*.{html,js,svelte,ts}',
    ],

    darkMode: 'class',

    theme: {
        extend: {},
    },

    plugins: [forms, typography, skeleton],
};

module.exports = config;

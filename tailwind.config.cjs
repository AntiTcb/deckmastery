const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const lineClamp = require('@tailwindcss/line-clamp');
const skeleton = require('@brainandbones/skeleton/tailwind/theme.cjs')

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@brainandbones/skeleton/**/*.{html,js,ts,svelte}'],

    darkMode: 'class',

    theme: {
        extend: {},
    },

    plugins: [forms, typography, lineClamp, skeleton],
};

module.exports = config;

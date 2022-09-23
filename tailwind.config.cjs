const typography = require('@tailwindcss/typography');
const forms = require('@tailwindcss/forms');
const aspectRatio = require('@tailwindcss/aspect-ratio');
const lineClamp = require('@tailwindcss/line-clamp');
const skeleton = require('@brainandbones/skeleton/tailwind.cjs')

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@brainandbones/skeleton/**/*.{html,js,ts,svelte}'],

    theme: {
        extend: {},
    },

    plugins: [forms, typography, aspectRatio, lineClamp, skeleton],
};

module.exports = config;

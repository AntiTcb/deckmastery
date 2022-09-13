const aspectRatio = require('@tailwindcss/aspect-ratio');
const typography = require('@tailwindcss/typography');
const skeleton = require('@brainandbones/skeleton/tailwind.cjs');

const config = {
    content: ['./src/**/*.{html,js,svelte,ts}', './node_modules/@brainandbones/skeleton/**/*.{html,js,ts,svelte}'],

    theme: {
        extend: {},
    },

    plugins: [typography, aspectRatio, skeleton],
};

module.exports = config;

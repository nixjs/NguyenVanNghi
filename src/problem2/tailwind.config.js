/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            boxShadow: {
                custom: '0 4px 12px #1b1a1ca3',
            },
        },
    },
    plugins: [],
}

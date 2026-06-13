/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        sidebar: '#0d0d1a',
        panel: '#12121f',
        card: '#1a1a2e',
        border: '#2a2a45',
        accent: '#7c3aed',
        'accent-hover': '#6d28d9',
      },
    },
  },
  plugins: [],
}

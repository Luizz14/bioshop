import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        frank: ['Frank Ruhl Libre', 'sans-serif'],
        lato: ['Lato', 'sans-serif'],
      },
      colors: {
        pear: {
          50: '#fbf6f1',
          100: '#f2e3d5',
          200: '#ead2be',
          300: '#ddb394',
          400: '#ce8d69',
          500: '#c3724c',
          600: '#b65f40',
          700: '#974a37',
          800: '#7a3e32',
          900: '#63342b',
          950: '#351915',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/aspect-ratio'), require('flowbite/plugin')],
}
export default config

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'windows-blue': '#0078D4',
        'windows-blue-dark': '#005A9E',
        'windows-gray': '#EDEDED',
        'windows-gray-dark': '#D0D0D0',
        'windows-bg': '#0078D4',
        'taskbar-bg': '#1A1A1A',
        'window-bg': '#FFFFFF',
        'window-border': '#C0C0C0',
        'start-menu-bg': '#2C2C2C',
        'start-menu-hover': '#3D3D3D',
      },
      boxShadow: {
        'window': '2px 2px 0 #808080, 4px 4px 0 #000000',
        'window-inner': 'inset 1px 1px 0 #FFFFFF, inset -1px -1px 0 #808080',
      },
    },
  },
  plugins: [],
}

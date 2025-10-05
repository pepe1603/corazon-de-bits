/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'background-light': '#FDF4F6', // Un rosa muy pálido, casi blanco
        'text-light': '#333333', // Gris oscuro para el texto
        'background-dark': '#1A1A1A', // Gris muy oscuro para el modo oscuro
        'text-dark': '#EAEAEA', // Gris claro para el modo oscuro
        'primary-pink': '#E83E8C', // Un rosa vibrante para los botones y elementos clave
        'secondary-pink': '#F48BA2', // Un rosa secundario para acentos
      },
      background: {
        light: '#f8fafc', // Gris muy claro para modo claro
        dark: '#111827', // Gris oscuro para modo oscuro
      },
    },
  },
  plugins: [],
}

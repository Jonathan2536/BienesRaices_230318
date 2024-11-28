/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./Views/**/*.pug'],
  theme: {
    extend: {},
    colors: {
        transparent: 'transparent',
        current: 'currentColor',
        black: '#000000',
        white: '#FFFFFF',
        dun: '#DAC4A2',
        'lion': '#BD9B65',
        'golden-brown': '#856828', // Asegúrate de que el nombre no tenga espacios
        gray: {
          100: '#F3F4F6',
          300: '#D1D5DB',
          500: '#6B7280',
          700: '#374151',
        },
        green: {
          500: '#10B981',
          700: '#065F46',
        },
        brown: {
          500: '#F59E0B',
          700: '#B45309',
        },
      // Corregido para evitar el espacio en el nombre
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        ador: 'LiAdorNoirrit-Regular',
        'ador-regular': 'LiAdorNoirrit-Regular',
        'ador-semibold': 'LiAdorNoirrit-SemiBold',
        'ador-bold': 'LiAdorNoirrit-Bold',
        geist: 'Geist-Regular',
        'geist-medium': 'Geist-Medium',
        'geist-semibold': 'Geist-SemiBold',
        'geist-bold': 'Geist-Bold',
        sans: 'Geist-Regular',
        regular: 'Geist-Regular',
        semibold: 'Geist-SemiBold',
        bold: 'Geist-Bold',
      },
    },
  },
  plugins: [],
};

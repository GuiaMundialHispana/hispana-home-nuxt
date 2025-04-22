module.exports = {
  plugins: [
    require('tailwindcss/nesting'), // O usa 'postcss-nesting'
    require('tailwindcss'),
    require('autoprefixer'),
  ],
};
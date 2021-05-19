let mix = require('laravel-mix');
mix.postCss('src/css/style.css', 'public/css', [
  require('tailwindcss'),
])
  .js('src/pages/games/infiltre.js', 'public/js');
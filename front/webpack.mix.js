let mix = require('laravel-mix');
mix.postCss('src/css/style.css', 'public/css', [
  require('tailwindcss'),
])
  .js('jeux/infiltre/infiltre.js', 'public/js');
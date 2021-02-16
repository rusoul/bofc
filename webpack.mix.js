const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js("resources/js/main.js", "public/js/scripts")
	.js("resources/js/admin.js", "public/js/scripts")
	.sass("resources/sass/app.scss", "public/css")
	.sass("resources/sass/admin.scss", "public/css")
	.browserSync({
		proxy: "localhost:8000",
		open: false
	})
	.options({ processCssUrls: false });
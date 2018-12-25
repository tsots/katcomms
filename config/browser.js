var paths = {
	dist_dir: 'dist',
	dist_files: 'dist/**/*.*',
	views: {
		src: 'src/views/**/*.hbs',
		dist: 'dist/views'
	},
	styles: {
		src: 'src/styles/**/*.scss',
		dist: 'dist/public/styles'
	},
	scripts: {
		src: (['./bower_components/jquery/dist/jquery.min.js',
  './bower_components/what-input/dist/what-input.min.js',
  './bower_components/foundation-sites/dist/js/foundation.min.js',
  './src/scripts/app.js']),
		dist: 'dist/public/scripts'
	}
};

module.exports = {
	paths: paths,
	plugins: {
			browserSync: {
	    proxy: "localhost:3000",
	    port: 7000, 
	    files: [ 
	      paths.dist_files 
	    ],
	    //browser: 'google chrome',
			chrome: '-browser "chrome.exe"'
	    //notify: true
    },
    nodemon: {
      script: 'server.js',
      ignore: [
        'gulpfile.js',
        'config/',
        'node_modules/'
      ]
    }
	}
};

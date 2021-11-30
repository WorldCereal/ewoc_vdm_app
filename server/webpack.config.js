var path = require('path');

module.exports = function override(config, env) {
	config.test = /\.(png$|jpe?g$|gif$|bmp$)?$/;
	config.loaders = 'url-loader';
	return config;
};

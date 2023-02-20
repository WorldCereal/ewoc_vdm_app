module.exports = function override(config) {
	config.test = /\.(png$|jpe?g$|gif$|bmp$)?$/;
	config.loaders = 'url-loader';
	return config;
};

var path = require('path');

module.exports = function override(config, env) {
	// comment when using package from npm
	config.resolve = {
		alias: {
			// 'classnames': './node_modules/classnames',
			// 'react': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/@gisatcz/ptr-state/node_modules/react',
			// '@gisatcz/ptr-maps': '/Users/vojtadubrovsky/Work/GISAT/git/@gisatcz/ptr-maps',
			// 'react': '/Users/vojtadubrovsky/Work/GISAT/git/ptr-maps/node_modules/react',
			// 'react-resize-detector': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/@gisatcz/ptr-maps/node_modules/react-resize-detector',
			// 'react-resize-detector': '/Users/vojtadubrovsky/Work/GISAT/git/app-esaWorldCerealProductViewer/node_modules/react-resize-detector',
			// '@gisatcz/ptr-timeline': '/Users/vojtadubrovsky/Work/GISAT/git/ptr-timeline'
		},
	};

	return config;
};

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import app from './app';
import Loadable from 'react-loadable';

const PORT = process.env.PORT || 3001;

process.on('SIGINT', () => {
	process.exit(0);
});

Loadable.preloadAll().then(() => {
	app.listen(PORT, () => {
		console.log(`CRA Server listening on port ${PORT}!`);
	});
});

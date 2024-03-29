import {EnvironmentPlugin} from 'webpack';

const publicUrl = '';

module.exports = {
	modifyWebpack: config => {
		const newConfig = {
			...config,
			plugins: [
				...config.plugins,
				new EnvironmentPlugin({
					PUBLIC_URL: publicUrl,
				}),
			],
			module: {
				rules: [
					{
						test: /\.js$/,
						use: {
							loader: 'babel-loader',
							options: {
								presets: [
									'cra-universal',
									'@babel/preset-env',
									'@babel/preset-react',
								],
								plugins: [
									'lodash',
									'react-loadable/babel',
									[
										'file-loader',
										{
											name: 'static/media/[name].[hash:8].[ext]',
											extensions: ['png', 'jpg', 'jpeg', 'gif', 'svg', 'ico'],
											publicPath: publicUrl,
											outputPath: '/public',
											context: '',
											limit: 0,
											emitFile: false,
										},
									],
								],
							},
						},
					},
					{
						test: /\.s[ac]ss$/i,
						use: [
							// Translates CSS into CommonJS
							'css-loader?url=false',
							// Compiles Sass to CSS
							'sass-loader',
						],
					},
					{
						test: /\.css/,
						use: [
							// Translates CSS into CommonJS
							'css-loader?url=false',
							// Compiles Sass to CSS
							// "sass-loader"
						],
					},
					{
						test: /\.svg/,
						use: {
							loader: 'svg-url-loader',
							options: {},
						},
					},
					{
						test: /\.(jpg|jpeg|gif|png|ico)$/,
						exclude: /node_modules/,
						loader:
							'file-loader?name=img/[path][name].[ext]&context=./app/images',
					},
				],
			},
		};
		return newConfig;
	},
};

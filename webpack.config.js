var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'webpack-bundle.js',
        publicPath: ''
    },
    module: {
		loaders: [
			{
				test: /\.js$|\.jsx$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
						presets: ['es2015', 'react']
				}
			},
			{
				test: /(\.css|\.scss)$/,
				loaders: ['style', 'css', 'sass']
			}
		]
	}
}
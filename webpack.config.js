var path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: __dirname,
        filename: 'webpack-bundle.js',
        publicPath: path.join(__dirname, './dist')
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
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const extractRoot = new MiniCssExtractPlugin({
	filename: 'css/admin.css',
});
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	entry: {
		app: path.join(__dirname, './app/index.js'),
	},
	output: {
		path: path.join(__dirname, './public'),
		filename: 'js/[name].js',
		publicPath: '/',
	},
	optimization: {
		runtimeChunk: true,
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendors',
					chunks: 'all',
				},
			},
		},
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				use: 'babel-loader?cacheDirectory=true',
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpg|gif|ttf|eot|woff|woff2|svg)$/,
				use: [
					{
						loader: 'file-loader',
					},
				],
			},
		],
	},
	devServer: {
		port: 4000,
		contentBase: 'public',
		historyApiFallback: {
			rewrites: [
				{ from: /^\//, to: '/index.html' },
			],
		},
	},
	plugins: [
		extractRoot,
		new HtmlWebpackPlugin({
			filename: 'index.html',
			chunks: ['app'],
			template: 'views/index.html',
		}),
	],
};

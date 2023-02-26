const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const environment = require('./environment')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')

module.exports = {
	entry: {
		main: './src/index.scripts.js',
		styles: './src/index.styles.scss',
	},
	output: {
		filename: 'js/[name].bundle.js',
		path: path.resolve(__dirname, '../dist'),
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.s?css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: { importLoaders: 1 },
					},
					{
						loader: 'postcss-loader',
					},
					{
						loader: 'sass-loader',
					},
				],
			},
			{
				test: /\.(png|jpe?g|gif|svg)$/i,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[hash].[ext]',
							outputPath: 'image',
						},
					},
					{
						loader: 'image-webpack-loader',
						options: {
							disable: environment.isDev,
						},
					},
				],
			},
			{
				test: /\.svg$/,
				loader: 'svg-inline-loader',
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].[contenthash].css',
			chunkFilename: '[id].[contenthash].css',
		}),
		new HtmlWebpackPlugin({
			title: 'Boilerplate',
			favicon: 'src/app/images/favicon.ico',
			template: 'src/index.html',
			minify: true,
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: 'src/app/images', to: 'images' },
				{ from: 'src/app/fonts', to: 'fonts' },
			],
		}),
		new ImageminWebpWebpackPlugin({
			config: [
				{
					test: /\.(jpe?g|png)/,
					options: {
						quality: 75,
					},
				},
			],
			overrideExtension: true,
			detailedLogs: false,
			silent: false,
			strict: true,
		}),
	],
}

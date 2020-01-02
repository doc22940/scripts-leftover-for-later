const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        index: './src/entry/script.js',
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['dynamic-import-node-babel-7'],
                    },
                },
            }, {
                test: /\.worker\.js$/,
                use: { loader: 'worker-loader' },
            }, {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                    options: {
                        removeComments: false,
                        collapseWhitespace: false,
                        interpolate: true,
                    },
                },
            }, {
                test: /\.(scss|sass|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { url: false, sourceMap: true } },
                    {
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    },
                ],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            hash: true,
            title: 'Some Basic Components',
            template: './src/entry/document.html',
            filename: './index.html', // relative to root of the application
        }),
        new MiniCssExtractPlugin({
            filename: 'styles.css',
            chunkFilename: '[id].css',
        }),
        new ScriptExtHtmlWebpackPlugin({
            preload: /\.js$/,
            defaultAttribute: 'defer',
        }),
        new CopyPlugin([
            { from: './src/assets/robots.txt', to: '.' },
        ]),
    ],
};

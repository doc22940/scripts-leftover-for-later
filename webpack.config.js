const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = env => {
    return {
        mode: env.mode,
        entry: {
            index: './src/entry/script.js',
        },
        output: {
            path: path.resolve(__dirname, 'public'),
            filename: 'bundle.[chunkhash].js',
            chunkFilename: '[name].[chunkhash].js',
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
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
            new CleanWebpackPlugin(),
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
            new BundleAnalyzerPlugin({
                analyzerMode: env.stats ? 'static' : 'disabled',
                openAnalyzer: env.stats,
                reportFilename: 'report/index.html',
            }),
        ],
    }
};

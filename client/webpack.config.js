const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {InjectManifest} = require('workbox-webpack-plugin');

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            title: 'Webpack Plugin'
        }),
        new InjectManifest({
            //points to the service worker config file path
            swSrc: './src/sw.js',
            //name of the service worker file that will be created in dist
            swDest: 'service-worker.js',
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node-modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: 'defaults' }]
                        ]
                    }
                }
            }
        ]
    }
};
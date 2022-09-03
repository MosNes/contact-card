const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

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
        new WorkboxPlugin.GenerateSW({
            //do not precache images
            exclude: [/\.(?:png|jpg|jpeg|svg)$/],
            //define runtime caching rules
            runtimeCaching: [{
                //match any request that ends with .svg, .jpg, .jpeg, or .png
                urlPattern: /\.(?:png|jpg|jpeg|svg)$/,
                
                //use the cache-first strategy (try to send response from cache, then if it's not available, fetch from network)
                handler: 'CacheFirst',

                options: {
                    //use custom cache name
                    cacheName: 'images',
                    //only cache 1 image
                    expiration: {
                        maxEntries: 1,
                    },
                },
            }],
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
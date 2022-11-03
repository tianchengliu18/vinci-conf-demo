import path from 'path';
import webpack from 'webpack';

import FaviconsWebpackPlugin from 'favicons-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { createRequire } from "module";
const require = createRequire(import.meta.url);


export default function (env, __dirname) {
    
    // import * as pageList from './pages.json'
    const pageList = require('./pages.json');
    const conferenceInfo = require('./conference.json');

    console.log(pageList);
    const pages = [];
    pageList.map((page) => {
        pages.push(new HtmlWebpackPlugin({
            title: page.title,
            filename: page.url + '.html',
            template: './' + page.url + '.pug',
            templateParameters: {
                pages: pageList,
                active: page,
                conference: conferenceInfo
            },
            minify: {
                conservativeCollapse: false
            }
        }));
    });

    return {

        context: path.resolve(__dirname, "./source"),
        entry: {
            'styles': ['./css/styles.scss'],
        },

        plugins: [
            ...pages,
            new FaviconsWebpackPlugin('img/vinci-logo-sm.png'),
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[id].css',
            }),
        ],

        output: {
            path: path.resolve(__dirname, "./build"),
            library: undefined,
        },

        module: {
            rules: [
                {
                    test: /\.pug$/,
                    include: /source/,
                    exclude: /(node_modules)/,
                    use: [{
                        loader: 'pug-loader',
                    }],
                },
                {
                    test: /\.(png|jpe?g|svg)$/,
                    use: [
                        {
                            loader: 'file-loader',
                            options: {
                                esModule: false,
                                name: '[name]_[md5:hash:hex:4].[ext]'
                            }
                        }
                    ]
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'sass-loader',
                    ],
                }
            ],
        },
    };
}

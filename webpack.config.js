const webpackUglifyJsPlugin = require("webpack-uglify-js-plugin");
const DEBUG = false;
const path = require("path");

module.exports = {
    watch: false,
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    //Review if we can use babel preset env here.
                    presets: ["es2015", "stage-2"]
                }
            }
        ]
    },
    watchOptions: {
        poll: 1000,
        aggregateTimeout: 200
    },
    entry: {
        "mdetect": "./js/all.bundle.js",
        "mdetect.mobile": "./js/mobile.bundle.js"
    },
    output: {
        path: __dirname + "/build/",
        filename: "[name].bundle.js"
    },
    plugins: [
        new webpackUglifyJsPlugin({
            cacheFolder: path.resolve(__dirname, "caches"),
            debug: DEBUG,
            minimize: !DEBUG,
            sourceMap: true,
            output: {
                comments: DEBUG
            },
            compressor: {
                warnings: DEBUG
            }
        })
    ]
};
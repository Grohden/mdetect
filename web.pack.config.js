const webpackUglifyJsPlugin = require("webpack-uglify-js-plugin");
const DEBUG = false;

module.exports = {
    watch: false,
    module: {
        loaders: [
            {
                test: /\.js?$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
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
        "mobile.detect": "./js/mdetect.js"
    },
    output: {
        path: __dirname + "/build/",
        filename: "js/[name].bundle.js"
    },
    plugins: [
        new webpackUglifyJsPlugin({
            //cacheFolder: path.resolve(__dirname, "caches"),
            debug: !DEBUG,
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
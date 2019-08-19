const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src",
    devtool: "eval",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.min.js"
    },
    module: {
        rules: [
            {
                test: /.ts$/,
                exclude: /(node_modules|dist)/,
                loader: 'ts-loader'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(),
        new CopyPlugin([
            {from: "./assets", to: "./assets"}
        ])
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        publicPath: '/dist/',
        host: 'localhost',
        port: 8080,
        open: true,
        compress: true,
        writeToDisk: true,
        liveReload: true,
        overlay: true
    }
}
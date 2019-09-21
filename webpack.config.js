const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
    entry: "./src",
    devtool: "eval",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.min.js"
    },
    module: {
        rules: [{
                test: /.ts$/,
                exclude: /(node_modules|dist)/,
                loader: 'ts-loader'
            },
            {
                test: /.ejs$/,
                loader: "ejs-compiled-loader"
            },
            {
                test: /\.css$/i,
                use: [{
                        loader: MiniCssExtractPlugin.loader
                    },
                    'css-loader'
                ],
            },
        ]
    },
    optimization: {
        usedExports: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
        new CopyPlugin([
            { from: "./assets", to: "./assets" }
        ]),
        new MiniCssExtractPlugin(),
        /* new BundleAnalyzerPlugin({
            analyzerMode: "static"
        }) */
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
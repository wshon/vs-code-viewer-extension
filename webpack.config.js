
const path = require("path");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const FileManagerPlugin = require('filemanager-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        bootstrap: "./src/bootstrap.ts",
        editor: "./src/editor/main.ts",
    },
    output: {
        path: path.resolve(__dirname, "dist", "srv"),
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: ["ts-loader"],
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader",],
            },
            {
                test: /\.ttf$/,
                use: ['file-loader']
            },
            {
                test: /\.html$/,
                use: ['file-loader?name=[name].[ext]']
            }
        ],
    },
    plugins: [
        new MonacoWebpackPlugin(),
        new FileManagerPlugin({
            events: {
                onStart: {},
                onEnd: {
                    copy: [
                        { source: './src/*.json', destination: './dist/', },
                        { source: './src/*.html', destination: './dist/', },
                        { source: './src/*.png', destination: './dist/', }
                    ],
                    archive: [
                        { source: './dist', destination: './dist/vs-code-viewer-extension.zip' },
                    ]
                },
            },
        }),
    ]
};
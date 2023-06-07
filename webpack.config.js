const path = require("path");

module.exports = {
    entry: "./src/index.jsx",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js",
        libraryTarget: "commonjs2",
        pathinfo: true,
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: "babel-loader",
                },
            },
            { test: /\.css$/, use: "css-loader" },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx"],
    },
    externals: {
        react: "commonjs react",
    },
    devtool: "source-map",
};

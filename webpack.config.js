module.exports = {
    entry: "./frontend/src/Game.ts",
    output: {
      path: __dirname + "/frontend",
      filename: "bundle.js",
    },

    devtool: 'source-map',
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    module: {
      rules: [
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ },
      ],
    },
    watchOptions: {
      aggregateTimeout: 200,
      poll: 1000
    }
};
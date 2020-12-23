module.exports = {
    entry: "./frontend/chesspieces.ts",
    output: {
      path: __dirname + "/frontend",
      filename: "bundle.js",
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".json"],
    },
    module: {
      rules: [
        // all files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'
        { test: /\.tsx?$/, use: ["ts-loader"], exclude: /node_modules/ },
      ],
    },
};
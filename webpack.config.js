const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");
const { dependencies, port, name } = require("./package.json");
delete dependencies.serve; // Needed for nodeshift bug

// Don't include PatternFly styles twice
const reactCSSRegex = /(react-[\w-]+\/public|react-styles\/css)\/.*\.css$/;

module.exports = (env = { navPort: 3000, jupyterPort: 3002 }, argv) => {
  const isProd = argv.mode === 'production';
  const { remoteSuffix } = env;
  const publicPath = (isProd && remoteSuffix)
    ? `http://streams${remoteSuffix}/`
    : `http://localhost:${port}/`;
  const jupyterPath = (isProd && remoteSuffix)
    ? `http://jupyter${remoteSuffix}/`
    : `http://localhost:${env.jupyterPort}/`;
  const navPath = (isProd && remoteSuffix)
    ? `http://nav${remoteSuffix}/`
    : `http://localhost:${env.navPort}/`;

  return {
    entry: "./src/index",
    mode: "development",
    devServer: {
      contentBase: path.join(__dirname, "public"),
      port
    },
    output: {
      path: path.resolve('public'),
      publicPath
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-react"],
          },
        },
        {
          test: /\.(svg|ttf|eot|woff|woff2|jpg|jpeg|png|gif)$/,
          use: 'file-loader',
        },
        {
          test: /\.s?css$/,
          exclude: reactCSSRegex,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: { hmr: !env.prod },
            },
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: reactCSSRegex,
          use: 'null-loader'
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new webpack.container.ModuleFederationPlugin({
        name,
        filename: "remoteEntry.js",
        remotes: {
          jupyter: `jupyter@${jupyterPath}remoteEntry.js`,
          nav: `nav@${navPath}remoteEntry.js`,
        },
        exposes: {
          "./pages": "./src/pages",
        },
        shared: {
          ...dependencies,
          react: {
            eager: true,
            singleton: true,
            requiredVersion: dependencies.react,
          },
          "react-dom": {
            eager: true,
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
  };
}

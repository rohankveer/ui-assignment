var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = {
   entry: './main.js',
	
   output: {
      path:'./',
      filename: 'index.js',
   },
	
   devServer: {
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
				
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass']
        },
        {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }
      ]
   },
    plugins: [
        new ExtractTextPlugin('style.css', {
            allChunks: true
        })
    ]
}

module.exports = config;
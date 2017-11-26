var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
// var webpack = require("webpack");

var entry = [
	"./src/alert/chat.js",
    "./src/alert/dragIn.js",
    "./src/alert/gain.js",
    "./src/alert/help.js",
    "./src/alert/history.js",
    "./src/alert/message.js",
    "./src/alert/playlist.js",
    "./src/alert/prize.js",
    "./src/alert/prop.js",
    "./src/alert/recharge.js",
    "./src/alert/roompool.js",
    "./src/alert/set.js",
    "./src/alert/tip.js",
    "./src/alert/grave.js",
    "./src/alert/rule.js",
    "./src/alert/cointip.js",
    "./src/alert/prompMsg.js",

    "./src/game/bottom.js",
    "./src/game/caopan.js",
    "./src/game/card.js",
    "./src/game/cardCtrl.js",
    "./src/game/coin.js",
    "./src/game/resultLayer.js",   
    "./src/game/table.js",
    "./src/game/top.js",
    "./src/game/scene.js",

   
    "./src/hall/com/head.js",
    "./src/hall/com/quickstart.js",
    "./src/hall/com/table.js",
    "./src/hall/com/rank.js",
    "./src/hall/scene.js",

    "./src/start/com/loading.js",
    "./src/start/scene.js"
  	
];
    
module.exports = {
    entry: entry,
    output: {
        path: __dirname + "/bin",
        filename: "main.min.js"
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: "json"
            },
            {
                test: /\.js$/,
                // exclude: /node_modules/,
                loader: 'babel-loader',//在webpack的module部分的loaders里进行配置即可
                query: {
                    presets: ['latest']
                }
            }
        ]
    },
    plugins: [
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};
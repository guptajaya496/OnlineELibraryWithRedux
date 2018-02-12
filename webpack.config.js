
var config = {

    entry:'./main.js',

    output : {
        path:'/',
        filename : 'index.js'
    },

    devServer:{
        inline:true,
        historyApiFallback: true
    },

    module:{
        loaders : [
            {
                test: /\.jsx?$/,
                exclude:/.node_modules/,
                loader:'babel-loader'
            },
            {
                test: /\.css$/,
                loader:'css-loader'
            }
        ]
    }
};

module.exports = config;

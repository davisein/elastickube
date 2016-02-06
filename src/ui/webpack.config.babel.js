import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack'


const webpackConfig = {

    entry: {
        elastickube: path.resolve(__dirname, 'app/app.loader.js'),
        vendor: ['angular', 'angular-animate', 'angular-aria', 'angular-material', 'angular-new-router', 'lodash']
    },

    resolve: {
        root: [
            path.resolve(path.join(__dirname, 'app'))
        ]
    },

    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel?presets[]=es2015!eslint', exclude: /\/(node_modules)\// },
            { test: /\.less/, loader: 'style!css!less' },
            { test: /\.html/, loader: 'html', include: /\/(app)\//, exclude: /\/(components)\// },
            {
                test: /\.html$/,
                include: /\/(components)\//,
                loader: `ngtemplate?relativeTo=${path.resolve(__dirname, '/app/')}/&prefix=./!html`
            },
            { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'file?name=assets/images/[name]-[hash].[ext]!img' }
        ]
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new webpack.optimize.CommonsChunkPlugin('vendor', ("production" === process.env.NODE_ENV) ? 'assets/js/[name]-[chunkhash].js' : 'assets/js/[name].js', Infinity)
    ],

    output:  {
        path: path.join(__dirname, process.env.BUILD_FOLDER || '../../build/ui'),
        publicPath: '/',
        filename: ("production" === process.env.NODE_ENV) ? 'assets/js/[name]-[chunkhash].js' : 'assets/js/[name].js'
    }
};

export default webpackConfig;

/* eslint no-process-env:0 */
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const PRODUCTION = process.env.NODE_ENV === 'production';
const webpackConfig = {

    entry: {
        elastickube: path.resolve(__dirname, 'app/app.loader.js'),
        vendor: [
            'jquery',
            'angular',
            'angular-animate',
            'angular-aria',
            'angular-material',
            'ui-router',
            'lodash',
            'normalize.css/normalize.css',
            'angular-material/angular-material.css']
    },

    resolve: {
        root: [
            path.resolve(__dirname),
            path.resolve(path.join(__dirname, 'app'))
        ]
    },

    module: {
        loaders: [
            { test: require.resolve('jquery'), loader: 'expose?jQuery' },
            { test: /\.js$/, loader: 'babel?presets[]=es2015!eslint', exclude: /\/(node_modules)\// },
            { test: /\.css/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
            { test: /\.less/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader') },
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
        new ExtractTextPlugin(PRODUCTION ? 'assets/css/[name]-[chunkhash].css' : 'assets/css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', PRODUCTION ? 'assets/js/[name]-[chunkhash].js' : 'assets/js/[name].js', Infinity)
    ],

    output: {
        path: path.join(__dirname, process.env.BUILD_FOLDER || '../../build/ui'),
        publicPath: '/',
        filename: PRODUCTION ? 'assets/js/[name]-[chunkhash].js' : 'assets/js/[name].js'
    },
    stats: {
        children: false
    },
    eslint: {
        failOnWarning: PRODUCTION
    }
};

export default webpackConfig;

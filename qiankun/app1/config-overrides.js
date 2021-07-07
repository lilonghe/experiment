module.exports = {
    // The Webpack config to use when compiling your react app for development or production.
    webpack: function(config, env) {
        config.entry = "./src/main.js";
        config.output = {
            library: `app1`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_app1`,
        }

      return config;
    },
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);
            config.headers = {
                'Access-Control-Allow-Origin': '*',
            };
            config.historyApiFallback = true;
            config.hot = false;
            config.watchContentBase = false;
            config.liveReload = false;

            return config;
        }
    }
}
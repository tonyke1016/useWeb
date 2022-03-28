const webpack = require("webpack");
const { HashedModuleIdsPlugin } = require("webpack");
const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const isProduction = process.env.NODE_ENV === "production";
function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    assetsDir: "static",
    productionSourceMap: false, //不生成map
    chainWebpack: (config) => {
        config.output.filename("static/js/[name].[hash:8].js");
        config.output.chunkFilename("static/js/[name].[hash:8].js");
        // 添加别名
        config.resolve.alias
            .set("@", resolve("src"))
            .set("assets", resolve("src/assets"))
            .set("views", resolve("src/views"))
            .set("store", resolve("src/store"))
            .set("util", resolve("src/util"))
            .set("config", resolve("src/config"))
            .set("components", resolve("src/components"))
            .set("plugin", resolve("src/plugin"));
    },
    configureWebpack: (config) => {
        const plugins = [];
        if (isProduction) {
            plugins.push(
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            comments: false, // 去掉注释
                        },
                        warnings: false,
                        compress: {
                            drop_console: true,
                            drop_debugger: false,
                            pure_funcs: ["console.log"], //移除 console
                        },
                    },
                })
            );

            // 用于根据模块的相对路径生成 hash 作为模块 id, 一般用于生产环境
            plugins.push(new HashedModuleIdsPlugin());
        }

        return { plugins };
    },
    devServer: {
        open: true, // 自动打开浏览器
    },
};

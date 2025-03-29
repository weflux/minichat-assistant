/* eslint-disable import/no-commonjs */
/* eslint-disable @typescript-eslint/no-var-requires */
const npath = require("path");
const pkg = require("../package.json");
const miniChain = require("./webpack/mini-chain");
const fs = require("fs");


/**
 * 需要拷贝的文件
 * Taro不会把 private.config.json 文件打包，所以使用copy直接将文件拷贝到项目根目录
 * 这样开发者工具才能读取到本地私有配置项
 */
const COPY_FILES = ["project.private.config.json"]

process.env.TARO_ENV = process.env.TARO_ENV ?? "weapp";
process.env.NODE_ENV = process.env.NODE_ENV ?? "production";
const generateCopyConfig = (list) => {
  const patterns = [];
  list.forEach((file) => {
    if (fs.existsSync(file))
      patterns.push({
        from: file,
        to: `${process.env.TARO_ENV}/${file}`,
      });
  });
  return {patterns};
};

const config = {
  copy: generateCopyConfig(COPY_FILES), // 拷贝文件
  projectName: pkg.name,
  date: "2024-11-11",
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    375: 2,
    828: 1.81 / 2,
  },
  sourceRoot: "src",
  outputRoot: process.env.TARO_ENV,
  alias: {
    src: npath.resolve(process.cwd(), "src"),
  },
  defineConstants: {},
  framework: "react",
  compiler: "webpack5",
  hmr: true,
  cache: {
    enable: true, // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    webpackChain(chain) {
      miniChain(chain);
    },
    lessLoaderOption: {
      lessOptions: {
        modifyVars: {
          hack: `true; @import "${npath.join(
            process.cwd(),
            "src/styles/index.less"
          )}";`,
        },
      },
      // 适用于全局引入样式
      additionalData: "@import '/src/styles/index.less';",
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {},
      },
      pxtransform: {
        enable: true,
        config: {},
      },
      url: {
        enable: true,
        config: {
          limit: 1024, // 设定转换尺寸上限
        },
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: "module", // 转换模式，取值为 global/module
          generateScopedName: "[name]__[local]___[hash:base64:5]",
        },
      },
    },
    miniCssExtractPluginOption: {
      ignoreOrder: true,
    },
    optimizeMainPackage: {
      enable: true,
    },
  },
  plugins: [
    ["@tarojs/plugin-framework-react", {reactMode: "concurrent"}],
    "@taro-hooks/plugin-react"
  ],
};

module.exports = function (merge) {
  return merge({}, config, require(`./${process.env.NODE_ENV}`));
};

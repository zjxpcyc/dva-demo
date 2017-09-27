const path = require('path');
const pxtorem = require('postcss-pxtorem');

const svgSpriteDirs = [
  require.resolve('antd').replace(/warn\.js$/, ''), // antd 内置svg
  path.resolve(__dirname, 'src/svg'),  // 业务代码本地私有 svg 存放目录
];

export default {
  entry: 'src/index.js',
  svgSpriteLoaderDirs: svgSpriteDirs,
  // "theme": "./theme.config.js",
  env: {
    development: {
      extraBabelPlugins: [
        'dva-hmr',
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'libraryDirectory': 'lib', 'style': 'css' }]
      ],
    },
    production: {
      extraBabelPlugins: [
        'transform-runtime',
        ['import', { 'libraryName': 'antd', 'libraryDirectory': 'lib', 'style': 'css' }]
      ],
      extraPostCSSPlugins: [
        pxtorem({
          rootValue: 100,
          propWhiteList: [],
        }),
      ],
    }
  },
  proxy: {
    "/api": {
      "target": "http://127.0.0.1:8080/",
      "headers":{
        "host":"127.0.0.1"
      }
    }
  }
}

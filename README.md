# dva-2.0 模板

主要是公司内部新建 dva 项目使用

[dva-cli](https://github.com/dvajs/dva-cli) 本身是可以创建新项目的, 但是它创建的是一个非常简单的项目框架

创建本 demo 的原因就是当项目内部统一的模板使用。

## 内置了部分库

* [antd](https://github.com/ant-design/ant-design)
* [classnames](https://github.com/JedWatson/classnames)
* [dva-loading](https://github.com/dvajs/dva/tree/master/packages/dva-loading)
* [dva-model-extend](https://github.com/dvajs/dva-model-extend)
* [invariant](https://github.com/zertosh/invariant)
* [lodash](https://github.com/lodash/lodash)
* [path-to-regexp](https://github.com/pillarjs/path-to-regexp)
* [postcss-pxtorem](https://github.com/cuth/postcss-pxtorem)
* [prop-types](https://github.com/facebook/prop-types)
* [react-helmet](https://github.com/nfl/react-helmet)

## 使用说明

* git clone 下来, 修改下目录名称, 然后 `npm i` 就可以了。
* 使用 [SAO](https://github.com/saojs/sao) (这个项目的名称是不是很霸气?)。
```javascript
// 1. mkdir project-dir
// 2. cd /path/to/project-dir
// 3. as fllow
sao zjxpcyc/dva-demo
```
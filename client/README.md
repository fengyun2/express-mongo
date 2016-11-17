# webpack2-react-redux-antd-mobile

> webpack2-react-redux-antd-mobile

##技术栈

- webpack2
- ant-mobile
- react
- react-router
- redux
- fetch
- express

##BUG

### 2016/11/17

- 1.
在 `webpack2` 升级后, `It's no longer allowed to omit the '-loader' prefix when using loaders`

当使用加载器时，不再允许省略'-loader'前缀

- 在 `webpack2` 升级后, `react-tap-event-plugin` 报错了, 暂时处理方法: 将其禁用

- 2.
~~原因：`Webpack 2.1.0-beta23` 之后的config里不能直接包含自定义配置项
解决：将`postcss`和`devServer`替换成以下写法即可~~

```js
plugins: {
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: function () {
        return [precss, autoprefixer];
      },
      devServer: {
        contentBase: "src", //本地服务器所加载的页面所在的目录
        colors: true, //终端中输出结果为彩色
        historyApiFallback: true, //不跳转
        inline: true //实时刷新
      }
    }
  })
}
```

function myPlugin(options) {
  //个性化定制
  this.options = options;
}

myPlugin.prototype.apply = function (compiler) {
  //编译过程事件回调函数
  compiler.plugin('compilation', (compilation) => {
    //通过compilation切入其他组件提供的事件
    compilation.plugin('html-webpack-plugin-before-html-processing', (htmlData, callback) => {
      console.log(htmlData.html);
      htmlData.html = htmlData.html.replace('<div id="app"></div>', `
      <div id="app"><div style="height: 200px;display: block;background-color: red">1212</div></div>
      `);
      //错误优先
      //如果处理有错误，传递到第一个参数，否则错误参数的位置就null
      callback(null, htmlData);
    })
  })
};
module.exports = myPlugin;
//向外导出供webpack.config.js中的mudule.exports.plugins.push(new MyPlugin)

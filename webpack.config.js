/* 
	该文件是webpack工作的配置文件
		webpack的入口在哪里？
		需要做什么工作？
		加工完的代码放在哪里？
		要使用哪些loader，去做什么样的处理？
		...
		所有以上信息，都要在该文件里明确指出，以后运行时只需要输入：webpack即可。
*/
const path = require('path'); //引入Node中内置的path模块，专门用于解决路径相关问题

module.exports = {
	entry: './src/js/app.js',//设置入口
	output: {//设置输出位置
    path: path.resolve(__dirname, 'dist/js'), 
    filename: 'app.js'
	},
	mode:'development',//工作模式
	//webpack所有用到的loader，都需要配置在module.rules中。
	//module.rules是一个数组，数组里每一项是一个对象，每个对象就是一个或一组loader的配置
	module: {
    rules: [
			//处理less文件
			{
				test: /\.less$/, //匹配所有的.less文件
				use:[
					{
						loader: 'style-loader' //将css模块翻译成style标签，嵌入页面
					},{
						loader: 'css-loader' //将编译出来的css变为Commonjs的一个模块
					},{
						loader: 'less-loader' //编译Less为CSS
					}
				]
			},
			//js语法检查
			{
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules文件夹
        loader: "eslint-loader",
      }
		]
  }
};

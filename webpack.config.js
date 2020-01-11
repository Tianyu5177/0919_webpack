/* 
	该文件是webpack工作的配置文件
		webpack的入口在哪里？
		需要做什么工作？
		加工完的代码放在哪里？
		要使用哪些loader，去做什么样的处理？
		...
		所有以上信息，都要在该文件里明确指出，以后运行时只需要输入：webpack即可
*/
const path = require('path'); //引入Node中内置的path模块，专门用于解决路径相关问题

module.exports = {
	entry: './src/js/app.js',//设置入口
	/* entry:{
		peiqi:'./src/js/app.js'
	}, */
	output: {
    path: path.resolve(__dirname, 'dist/js'), //设置输出位置
    filename: 'app.js'
	},
	mode:'development'//工作模式
};
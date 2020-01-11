/* 
	该文件是webpack工作的入口文件，所有要让webpack处理的文件，都要在此引入
	ES6模块化语法回顾：
		1.暴露：分别暴露、统一暴露、默认暴露
		2.引入：
				import {} from xxxx  ---->若采用的是：分别暴露、统一暴露，用此种方式引入。
				import a from xxxxx  ---->若采用的是：默认暴露，用此种方式引入。
*/
//引入模块
import {sum} from './module1'
import {sub} from './module2'
import module3 from './module3'
//在es6模块化语法中，若要引入json文件，按照如下写法
import data from '../json/data.json'
//引入less样式文件
import '../css/index.less'
//引入polyfill，处理js兼容性问题（代价太大）
//import '@babel/polyfill';

console.log(sum(1,2));
console.log(sub(3,4));
console.log(module3.mul(3,4));
console.log(module3.div(6,3));
console.log(data);//webpack能自动转换json为js

setTimeout(()=>{
	console.log('定时器到点了');
},1000)

let p = new Promise((resolve)=>{
	setTimeout(()=>{
		resolve('成功的数据')
	},1000)
})
p.then(
	value => console.log(value),
	reason => console.log(reason)
)
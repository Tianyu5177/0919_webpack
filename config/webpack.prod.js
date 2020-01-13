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
//引入HtmlWebpackPlugin，用于创建html文件
const HtmlWebpackPlugin = require('html-webpack-plugin')
//引入清空打包目录插件
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // 注意要解构赋值！！！
//引入提取css插件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//引入插件，压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: ['./src/js/app.js','./src/index.html'],//设置入口
	output: {//设置输出位置
    path: path.resolve(__dirname, '../dist'), 
    filename: './js/app.js'
	},
	mode:'production',//工作模式
	//webpack所有用到的loader，都需要配置在module.rules中。
	//module.rules是一个数组，数组里每一项是一个对象，每个对象就是一个或一组loader的配置
	module: {
    rules: [
			//处理less文件
			{
				test: /\.less$/, //匹配所有的.less文件
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								require('postcss-flexbugs-fixes'),
								require('postcss-preset-env')({
									autoprefixer: {
										flexbox: 'no-2009',
									},
									stage: 3,
								}),
								require('postcss-normalize')(),
							],
							sourceMap: true,
						},
					},
					'less-loader',
				]
			},
			//js语法检查
			{
        test: /\.js$/,
        exclude: /node_modules/, //排除node_modules文件夹
        loader: "eslint-loader",
			},
			//ES6转ES5
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							[
								'@babel/preset-env',
								{
									useBuiltIns: 'usage',  // 按需引入需要使用polyfill
									corejs: {version: 3}, // 解决warn
									targets: { // 指定兼容性处理哪些浏览器
										"chrome": "75",
										"ie": "8",
									}
								}
							]
						],
						cacheDirectory: true, // 开启babel缓存
					}
				}
			},
			//使用url-loader处理图片资源
			{
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
							name:'[hash:5].[ext]',
							outputPath:"images",//配置图片输出的路径，
							publicPath :"/images",//配置引入图片的路径（webpack3必须写images）
							limit: 8192, //小于8KB的图片转成base64
							esModule:false //解决html-loader处理图片时，src变为[object,Module]的问题
						},
          },
        ],
			},
			//处理html中img标签
			{
				test: /\.(html)$/,
				use: {
					loader: 'html-loader'
				}
			},
			//处理其他文件
			{
				test: /\.(eot|svg|woff|woff2|ttf|mp3|mp4|avi)$/,  // 处理其他资源
				loader: 'file-loader',
				options: {
					outputPath: 'media',
					name: '[hash:5].[ext]'
				}
		}

		]
	},
	//所有需要使用的插件在plugins中new出实例
	plugins: [
		new HtmlWebpackPlugin({
      template: './src/index.html', // 以指定的html文件为模板创建新的HtML(1. 结构和原来一样 2. 会自动引入打包的资源)
		}),
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessorPluginOptions: {
				preset: ['default', { discardComments: { removeAll: true } }],
			},
			cssProcessorOptions: { // 解决没有source map问题
				map: {
					inline: false,
					annotation: true,
				}
			}
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html',
			minify: {
				removeComments: true, 
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true,
			}
		})
	],
	devServer: {
    open: true, // 自动打开浏览器
    compress: true, // 启动gzip压缩
		port: 4000, // 端口号
		hot: true // 开启热模替换功能 HMR
	},
	devtool:'cheap-module-eval-source-map',
};

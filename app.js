const express = require('express')
let app = express()
let swig = require('swig')
let mongoose = require('mongoose')
let bodyParser = require('body-parser');

// cmd  
// mongod --dbpath=/Users/Ivan/Documents/Coding/REPOSITORY/node实战/db --port=27018
mongoose.connect('mongodb://localhost:27018/blog', (err)=>{
	if(err){
		console.log('connect fail')
	}else{
		console.log('connect success')
	}
})

// 不使用缓存
swig.setDefaults({
	cache: false,
})

app.use( bodyParser.urlencoded({
	extended: true,
}) )

// 设置模板引擎
app.engine('html', swig.renderFile)
app.set('views', './views')
app.set('view engine', 'html')

// 静态文件处理
app.use('/public', express.static(`${__dirname}/public`))

// 
app.use('/admin', require('./routers/admin'))
app.use('/api', require('./routers/api'))
app.use('/', require('./routers/main'))


// 路由
// app.get('/', (req,res) => {
// 	res.render('index')
// })

app.listen(8088)
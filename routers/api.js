let express = require('express')
let router = express.Router()
let User = require('../models/User.js')
let modelUser = new User();

let responseData;
router.use((req, res, next)=>{
	responseData = {
		code: 1,
		message: '',
		data: null,
	}
	next();
})

// 用户注册
router.post('/user/register', (req,res,next) => {
	let { username, password, repassword} = req.body;

	// 用户不能为空
	if(!username){
		responseData.code = -1;
		responseData.message = '用户名不能为空';
		res.json(responseData);
		return;
	}

	// 密码不能为空
	if(!password){
		responseData.code = -1;
		responseData.message = '密码不能为空';
		res.json(responseData);
		return;
	}

	// 密码不相同
	if(password !== repassword){
		responseData.code = -1;
		responseData.message = '两次输入的密码不一致';
		res.json(responseData);
		return;
	}

	modelUser.username = username
	modelUser.password = password
	modelUser.save((err)=>{
		console.log(err)
	})

	responseData.message = '注册成功';
	res.json(responseData);

})

// 获取用户名列表
router.get('/users', (req, res, next)=>{
	console.log(User.find)
	console.log(modelUser)
	User.find({}, function (err, users) {
		if(err){
			responseData.code = -1;
		}else{
			responseData.data = users
		}
		res.json(responseData)
		
	})
})

// 根据ID换取用户名
router.get('/user', (req, res, next)=>{
	let userId = req.query.id
	User.findById(userId, (err, user)=>{
		if(err){
			responseData.code = -1;
		}else{
			responseData.data = user
		}

		res.json(responseData)
	})
})


module.exports = router
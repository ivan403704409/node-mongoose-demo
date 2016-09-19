let express = require('express')
let router = express.Router()

router.get('/', (req,res,next) => {
	res.send('首页')
})

module.exports = router
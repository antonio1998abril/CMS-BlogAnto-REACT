const router =require('express').Router()
const userController = require('../controllers/userController')
const UserPostController=require('../controllers/userPostController')




router.get('/mypost',UserPostController.alluserpost)
router.post('/mypost',UserPostController.createuserpost)


module.exports=router
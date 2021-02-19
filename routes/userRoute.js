const router =require('express').Router()
const userController=require('../controllers/userController')
const auth=require('../middleware/auth')

router.post('/register',userController.register)
router.post('/login',userController.login)

router.get('/logout',userController.logout)  
router.get('/refresh_token',userController.refreshToken)
router.get('/infor',auth,userController.getUser)

router.get('/allmycomments/:id',userController.getCommentUser)
router.get('/perating/:id',userController.getRatingperuser)
module.exports=router
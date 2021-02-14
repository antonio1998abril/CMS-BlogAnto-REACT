const router =require('express').Router()
const generalController=require('../controllers/PostController')


router.get('/',generalController.GeneralGetPost)


module.exports=router
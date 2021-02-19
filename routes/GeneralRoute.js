const router =require('express').Router()
const generalController=require('../controllers/PostController')


router.get('/',generalController.GeneralGetPost)
router.get('/get/:id',generalController.getPost)
router.patch('/post/:id',generalController.reviews)

module.exports=router
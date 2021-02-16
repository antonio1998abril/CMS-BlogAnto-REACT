const router =require('express').Router()
const UserPostController=require('../controllers/userPostController')




router.get('/allpost/:id',UserPostController.alluserpost)
router.post('/mypost',UserPostController.createuserpost)
router.delete('/delete/:id',UserPostController.deleteuserpost)

module.exports=router
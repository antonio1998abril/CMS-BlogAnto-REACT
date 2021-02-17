const router=require('express').Router()
const commentController=require('../controllers/CommentController')

router.route('/comments/:id')
    .get(commentController.getComments)


module.exports=router
const Post=require('../models/PostModel').Post

module.exports={
    GeneralGetPost:async(req,res)=>{
        try{
            const getgenralpost= await Post.find().lean()
            .populate({path:'user',model:'user'})
            res.json({
                status:'success',
                result:getgenralpost
            })
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    getPost:async(req,res)=>{
        try{
            const getpost=await Post.findById(req.params.id).lean()
            .populate({path:'user',model:'user'})
            res.json({
                status:'success',
                result:getpost
            })
        }catch(err){
            return res.status(500).json({msg:err.message})   
        }
    },
    
    reviews:async(req,res)=>{
        try{
           const {rating}=req.body

           if(rating && rating !== 0){
               const post=await Post.findById(req.params.id)

               if(!post) return res.status(400).json({msg:'Post does not exist'})

               let num=post.numReviews
               let rate=post.rating
               await Post.findOneAndUpdate({_id:req.params.id},{
                   rating:rate +rating, numReviews:num+1
               })
                res.json({msg:'(╭☞ ͡ ͡° ͜ ʖ ͡͡°)╭☞'})
            }
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
    
}
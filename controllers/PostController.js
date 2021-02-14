const Post=require('../models/PostModel').Post

module.exports={
    GeneralGetPost:async(req,res)=>{
        try{
            const getgenralpost= await Post.find().lean()

            res.json({
                status:'success',
                result:getgenralpost
            })
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    
}
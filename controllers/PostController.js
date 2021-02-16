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
    
}
const Post=require('../models/PostModel').Post


module.exports={
    alluserpost:async(req,res)=>{
        try{
            const iduser= req.params.id;
            const getpersonalposts= await Post.find({user:iduser}).lean()
            .populate({path:'user',model:'user'})
            res.json({
                status:'success',
                result:getpersonalposts
            })
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    createuserpost:async(req,res)=>{
        const {title,description,content,user,images}=req.body
        const post= await Post.findOne({title})

        if (post){
            return res.status(400).json({msg:"This Post already exist"})
        }else{
            const newPost=new Post({
                title,description,content,images,user
            })
            await newPost.save()
            res.json({msg:"You have created a new Post."})
        }
    },
    deleteuserpost:async(req,res)=>{
        
        try{
            await Post.findByIdAndDelete(req.params.id)
            res.json({msg:"Post Deleted"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateuserpost:async(req,res)=>{
        try{
        const{title,description,content,images}=req.body
        await Post.findOneAndUpdate({_id:req.params.id},{
            title,description,content,images
        })
        res.json({msg:"Updated"})
      
            
        
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }

    
}

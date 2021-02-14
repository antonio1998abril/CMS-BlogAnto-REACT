const Post=require('../models/PostModel').Post


module.exports={
    alluserpost:async(req,res)=>{
        try{
            const iduser= req.body.id;
            const getpersonalposts= await Post.find({user:iduser}).lean()

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
                title,description,content,user,images
            })
            await newPost.save()
            res.json({msg:"You have created a new Post."})
        }
    },
    updateuserpost:async(req,res)=>{

    },
    deleteuserpost:async(req,res)=>{

    }

    
}

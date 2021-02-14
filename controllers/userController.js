const Users=require('../models/UserModel').Users
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken')
process.env.SECRET_KEY='secret'

module.exports={
    register:async(req,res)=>{
        try{
            const {name,email,password}=req.body;
            const user=await Users.findOne({email});

            if(user)
                return res.status(400),json({msg:"The email already exist"})
            
            if(password.length<6)
                return res.status(400).json({msg:"Password is at leadt 6 characters long"})
        
               const passwordHash=await bcrypt.hash(password,10)
               const newUser=new Users({
                   name,email,password:passwordHash
               }) 
            await newUser.save()
            //AQUI CREAMOS JWB TOKEN
               const accesstoken={id:newUser._id}
               const refreshaccesstoken={id:newUser._id}

            const token=jwt.sign(accesstoken,process.env.SECRET_KEY,
                {expiresIn:'1d'})

            const refreshtoken=jwt.sign(refreshaccesstoken,process.env.SECRET_KEY,
                {expiresIn:'7d'})
                res.cookie('refreshtoken',refreshtoken,{
                    httpOnly:true,
                    path:'/user/refresh_token',
                    maxAge:7*24*60*60*1000
                })
          
            res.json({token})
            }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    refreshToken:(req,res)=>{
        try {
            const rf_token=req.cookies.refreshtoken;
            if(!rf_token){
                return res.status(400).json({msg:"Please Login or Register"})
            }
            jwt.verify(rf_token,process.env.SECRET_KEY,(err,user)=>{
                if(err)  return res.status(400).json({msg:"Please Login or Register"})
                    
                    const accesstoken={id:user.id}
                    const token=jwt.sign(accesstoken,process.env.SECRET_KEY,
                        {expiresIn:'1d'})

                    res.json({token})
                
            })
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    login:async(req,res)=>{
        try{
            const {email,password}=req.body;

            const user=await Users.findOne({email})
            if(!user){
                return res.status(400).json({msg:"User Doesnt exist"})
            }
            const isMatch=await bcrypt.compare(password,user.password)
            if (!isMatch){
                return res.status(400).json({msg:"Incorrect password"})
            }
            const accesstoken={id:user._id}
            const refreshaccesstoken={id:user._id}

         const token=jwt.sign(accesstoken,process.env.SECRET_KEY,
             {expiresIn:'15s'})

         const refreshtoken=jwt.sign(refreshaccesstoken,process.env.SECRET_KEY,
             {expiresIn:'7d'})
             res.cookie('refreshtoken',refreshtoken,{
                 httpOnly:true,
                 path:'/user/refresh_token',
                 maxAge:7*24*60*60*1000
             })
       
         res.json({token})

        }catch (err){
            return res.status(500).json({msg: err.message})
        }
    },
    logout: async(req,res)=>{
        try{
            res.clearCookie('refreshtoken',{path:'/user/refresh_token'})
            return res.json({msg:"Logged out"})
        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
     getUser:async(req,res)=>{
        try{    
            const user= await Users.findById(req.user.id).select('-password')

            if(!user)return res.status(400).json({msg:"User doe not exist"})
            res.json(user)

        }catch(err){
            return res.status(500).json({msg:err.message})
        }
    }
}
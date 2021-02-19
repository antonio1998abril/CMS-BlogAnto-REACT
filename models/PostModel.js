const mongoose=require('mongoose')
const Schema=mongoose.Schema;

const postSchema=new Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    creationDate:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'user'
    },
    rating:{
        type:Number,
        default:0,
        required:true
    },
    numReviews:{
        type:Number,
        required:true,
        default:0
    },
    images:{
        type:Object,
        required:true
    }
})

module.exports={Post:mongoose.model('post',postSchema)}
const mongoose =require('mongoose')
const Schema =mongoose.Schema;

const ChatSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    content:{
        type:String
    },
    post_id:{
        type:String
    },
    rating:{
        type:Number,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    reply:{
        type:Array
    }
}, {
    timestamps:true
})

module.exports={Chat:mongoose.model('chat',ChatSchema)};
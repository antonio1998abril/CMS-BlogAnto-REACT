require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose')
const cors=require('cors')
const bodyParser=require('body-parser')
const cookieParser =require('cookie-parser')
const fileUpload = require('express-fileupload')

const path =require('path')


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles:true
}))
///Conexion a las rutas
const userRoute=require('./routes/userRoute')
const generalRoute=require('./routes/GeneralRoute')
const userpost=require('./routes/userPostRoute')
const uploadRoute=require('./routes/uploadimage')
const commentRoute=require('./routes/commentRoute')
////
app.use('/user',userRoute)
app.use('/api',uploadRoute)
app.use('/api',commentRoute)
app.use('/api',generalRoute)
app.use('/api',userpost)






//////////////////////////////////////////SOCKET IO///////////////////////////////////////////////
const Comments=require('./models/chatModel').Chat

const http =require('http').createServer(app)
const io = require('socket.io')(http)

let users=[]
io.on('connection',socket=>{
    console.log(socket.id + ' connected.')

    socket.on('joinRoom',id=>{
        const user={userId:socket.id,room:id}
        const check=users.every(user=>user.userId !== socket.id)
        if (check){
            users.push(user)
            socket.join(user.room)
        }else{
            users.map(user=>{
                if(user.userId === socket.id){
                    if(user.room !== id){
                        socket.leave(user.room)
                        socket.join(id)
                        user.room=id
                    }
                }
            })
        }
        /* console.log(users)
        console.log(socket.adapter.rooms) */
    })

    socket.on('createComment',async msg=>{
        const {username,content,post_id,createdAt,rating,send,setuserid}=msg
        console.log(msg)
        const newComment=new Comments({
            username,content,post_id,createdAt,rating,setuserid
        })

       /*  await newComment.save() */

      /*   io.to(newComment.post_id).emit('sendCommentToClient',newComment) */

      if(send === 'replyComment'){
        const {_id, username, content, post_id, createdAt, rating,setuserid} = newComment

        const comment = await Comments.findById(post_id)

        if(comment){
            comment.reply.push({_id, username, content, createdAt, rating,setuserid})

            await comment.save()
            io.to(comment.post_id).emit('sendReplyCommentToClient', comment)
        }
        }else{
            await newComment.save()
            io.to(newComment.post_id).emit('sendCommentToClient', newComment)
        }
    })

    socket.on('disconnect',()=>{
        console.log(socket.id+ 'disconnected')
    })
})

/////////////////////////////////////////SOCKET IO///////////////////////////////////////////////7









//conexion a la base de datos
//MONGO DB
//AQUI INICIA EL PROGRAMA
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err =>{
    if(err) throw err;
    console.log('Connected to MongoDB')
})
///RUN react
if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}
//Run server
const PORT = process.env.PORT || 5000
http.listen(PORT, () =>{
    console.log('Server is running on port', PORT)
})
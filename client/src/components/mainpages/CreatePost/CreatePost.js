import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { GlobalState } from '../../../GlobalState'
import Loading from '../utils/Loading/Loading'

const initialState={
    title:'',
    description:'',
    content:'',
    user:''
}

function CreatePost() {
    const state=useContext(GlobalState)
    const [userid]=state.userAPI.userid
    const [post,setPost]=useState(initialState)

    const history = useHistory()
    const handleChangeInput=e=>{
        const {name,value}=e.target
        setPost({...post,[name]:value})
    }
/* agregar input el user id type="hdiden" */
    post.user=userid

    
    const handleSubmit=async e=>{
        e.preventDefault()
        try{
            if(onEdit){
              await axios.put(`/api/update/${post._id}`,{...post,images})
            }else{
                await axios.post('/api/mypost',{...post,images})
            }
           
            history.push(`/mypost/${userid}`)
        }catch(err){
        alert(err.response.data.msg)
        }
    }
    ///////////////////UPDATE POST////////////////////
    const [selfmypost,setmyPost]=useState([])

    const params=useParams()
    const [onEdit,setOnEdit] =useState(false)

    useEffect(()=>{
        const getPostuser=async(userid)=>{
            try{
                const getuser=await axios.get(`/api/allpost/${userid}`)
                setmyPost(getuser.data.result)
               
            }catch(err){
                alert(err.response.data.msg)
            }
        }
            getPostuser(userid)
        
},[userid])

        useEffect(()=>{
            if(params.id){
                setOnEdit(true)
                selfmypost.forEach(post=>{
                    if(post._id=== params.id){
                        setPost(post)
                        setImages(post.images)
                    }
                })
            }else{
                setOnEdit(false)
                setPost(initialState)
                setImages(false)
            }
        },[params.id,selfmypost])
    ////////////////////UPDATE POST/////////////////// 


    ///////////////////IMAGE//////////////////////////
    const [images,setImages]=useState(false)
    const [loading,setLoading] = useState(false)
    const [isLogged]=state.userAPI.isLogged
    const [token] = state.token


    const styleUpload={
        display:images ? "block" :"none"
    }

    const handleUpload =async e=>{
        e.preventDefault()
        try{
            if(!isLogged)
            return alert("you are not Logged")
            const file=e.target.files[0]

            if(!file) return alert("file not exist")

            if(file.size >1024 *1024)
            return alert("File not exist")

            if(file.type !== 'image/jpeg' && file.type !== 'image/png')
            return alert("File format is incorrect")

            let formData = new FormData()
            formData.append('file',file)

            setLoading(true)
             const res= await axios.post('/api/upload',formData,{
                 headers:{'content-type':'multipart/form-data',Authorization:token}
             }) 
             setLoading(false)
             setImages(res.data)
        }catch(err){
            alert(err.response.data.msg)
        }
    }


    const handleDestroy=async()=>{
        try{
            if(!isLogged) return alert("you are not logged")
            setLoading(true)
            await axios.post('/api/destroy',{public_id: images.public_id},{
                headers:{Authorization:token}
            })
            setLoading(false)
            setImages(false)

        }catch(err){
            alert(err.response.data.msg)
        }
    }
    //////////////////IAMGE/////////////////////////

    return (
        <div className="row">
           
            <div className="container">
            <br></br>
                <div className="border rounded border-info  card  mx-auto  ">
                    <form  onSubmit={handleSubmit}> 
                        <div className="form-group">
                            <label htmlFor="title" className="label bold">Title: </label>
                            <input className="form-control col-md-11 position border" type="text" name="title" id="title"
                            placeholder="Title" required  value={post.title}  onChange={handleChangeInput}></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description" className="label bold">Description: </label>
                            <input className="form-control col-md-11 position border" type="text" name="description" id="description"
                            placeholder="Description" required  value={post.description}  onChange={handleChangeInput}></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="content" className="label bold">Content: </label>
                            <textarea className="form-control col-md-11 position border" type="text" name="content" id="content"
                            placeholder="Content" required  value={post.content}  onChange={handleChangeInput}></textarea>
                        </div>
                       

                        <div className="create_product">
                            <div className="upload">
                                <input type="file" name="file" id="file_up" onChange={handleUpload}></input>
                                    {
                                    loading ? <div id="file_img"><Loading></Loading></div>
                                        :<div id="file_img" style={styleUpload}>
                                        <img src={images ? images.url:''} alt=""></img>
                                        <span onClick={handleDestroy}>X</span>
                                    </div>
                                    }
                            </div>
                        </div>
                        
                        <div className="form-group">
                            <button className=" btn btn-primary btn-lg  float-right button-create" type="submit"> { onEdit ?"Update":"Create"}</button>
                        </div>

                    </form>
   
             
                </div>
            </div>
        </div>
    )
}

export default CreatePost

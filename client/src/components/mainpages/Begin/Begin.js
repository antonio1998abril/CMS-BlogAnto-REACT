import axios from 'axios'
import React, {useEffect, useState} from 'react'


import PostRoom from '../PostRoom/PostRoom'
//AQUI MANDE EL VALOR DEL ID DEL USUARIO
function Begin() {
    const [selfPost,setSelfPost]=useState([])

    useEffect(()=>{
        const getPostuser=async()=>{
            try{
                const res=await axios.get('/api/')
                setSelfPost(res.data.result)
               
            }catch(err){
                alert(err.response.data.msg)
            }
        }
            getPostuser()
        
},[])
   
  

    return (
        <>
        <br></br>
        <div className="container">
        <div className="post_page">
     { selfPost.map(post=>{
            return <PostRoom key={post._id} post={post}/> })
     }
     
        </div>
        </div>
        </>
    )
} 

export default Begin

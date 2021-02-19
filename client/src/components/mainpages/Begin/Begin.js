import React, { useEffect, useState} from 'react'
import { getData } from '../FetchData'
import BeginPage from '../PostRoom/BeginPage'
//AQUI MANDE EL VALOR DEL ID DEL USUARIO
function Begin() {
    const [selfPost,setSelfPost]=useState([])

    useEffect(()=>{
       
        getData('/api/')
        .then(res=> setSelfPost(res.data.result))
        .catch(err=>console.log(err.response.data.msg))
},[])


    return (
        <>
 
 <div className="container">
  <div className="row">
      
     { selfPost.map(post=>{
            return <BeginPage key={post._id} post={post}/> })
     }
     </div>
        
        </div>
        </>
    )
} 

export default Begin

/* import { useState,useEffect} from 'react'
import Axios from 'axios'

function PostGeneralAPI() {
    const [GlobalPosts,setGolbalPosts]=useState([]);
    
    useEffect(()=>{
        const getPosts=async()=>{
            const res=await Axios.get('/api/')
            setGolbalPosts(res.data.result)
           
        }
        getPosts()
    },[])
    return {
        globalposts:[GlobalPosts,setGolbalPosts]
    }
    
}

export default PostGeneralAPI
  */
/* import axios from 'axios'
import  React ,{ useContext, useEffect, useState } from 'react'
import { GlobalState } from '../GlobalState'

function UserPostAPI() {
    const  state= useContext(GlobalState)
    const [userid]=state.userAPI.userid

    const [PostSelf,setPostSelf]=useState([])

    



    useEffect(()=>{
        const getPosts=async()=>{
            const res=await axios.get(`/api/mypost/${userid}`)
            setPostSelf(res.data.result)
        }
        getPosts()
    },[])

    return{
        postself:[PostSelf,setPostSelf]
    }
}

export default UserPostAPI */



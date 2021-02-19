import Axios from 'axios'
import React, {createContext,useState,useEffect} from 'react'

import UserAPI from './api/UserApi'
import { getData } from './components/mainpages/FetchData'

import io from 'socket.io-client'


export const GlobalState = createContext()

export const DataProvider=({children})=>{
    const [token,setToken]=useState(false)
    const [GlobalPosts,setGolbalPosts]=useState([]);
    const [socket, setSocket] = useState(null)

    useEffect(()=>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const refreshToken=async()=>{
                 const ver=await Axios.get('/user/refresh_token')      
                setToken(ver.data.token) 
   
                setTimeout(()=>{
                    refreshToken()
                },15000)
            
            }
            refreshToken()
        }
        else{
            
        }        
    },[])
    useEffect(()=>{
       
            getData('/api/')
            .then(res=> setGolbalPosts(res.data.result))
            .catch(err=>console.log(err.response.data.msg))
           
            const socket = io()
            setSocket(socket)
            return () =>  socket.close()
        
    
    },[])
 
    


    const state={
        token:[token,setToken],
        userAPI:UserAPI(token),
        //socletio
        post:[GlobalPosts,setGolbalPosts],
        socket
      
    }
   
    return(
        <GlobalState.Provider value={state}>
        {children}
        </GlobalState.Provider>
    )
}


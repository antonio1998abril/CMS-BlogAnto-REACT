import  { useState,useEffect } from 'react'
import Axios from 'axios'


function UserApi(token) {
    const [isLogged,setIsLogged]=useState(false)
    
///Para mandar datos de un componente a otro declaras el dato que ocupas
    const [userid,setuserid]=useState('')
   
    useEffect(()=>{
        if(token){
            const getUser =async()=>{
                try{ 
         const getdata= await Axios.get('/user/infor', {
                        headers: {Authorization: token}  
                    })
                    setIsLogged(true)
             ///guardas la respues qui
                    setuserid(getdata.data._id)
                }catch(err){
                    alert(err.response.data.msg)
                }
            }
            getUser()
        }
          
    },[token])




    return {
        isLogged:[isLogged,setIsLogged],
        ///lo mandas a donde?, a donde lo quieras mandar en este caso Begin
        userid:[userid,setuserid]
        
    }
  
}

export default UserApi

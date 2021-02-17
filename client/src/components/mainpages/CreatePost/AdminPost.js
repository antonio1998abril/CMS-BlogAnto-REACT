
import  React ,{ useContext,useState,useEffect} from 'react'
import { GlobalState } from '../../../GlobalState'

import Axios from 'axios'
import PostItem from '../utils/PostItem'
import add from '../../icon/add.svg'
import { Link, useHistory ,useParams} from 'react-router-dom'
import Loading from '../utils/Loading/Loading'



function AdminPost() {
    const  state= useContext(GlobalState)
    const [token] =state.token
  /*    const [userid]=state.userAPI.userid  */
/*  const userid='60273e39cd6f8f2b889975b1';  */
    const [selfPost,setSelfPost]=useState([])
    const history=useHistory()
    const [loading,setLoading]=useState(false)
    const [callback,setCallback]=useState(false)

    const { id } = useParams();

   

    const userid=id
    useEffect(()=>{
            const getPostuser=async(userid)=>{
                try{
                    const getuser=await Axios.get(`/api/allpost/${userid}`)
                    setSelfPost(getuser.data.result)
                   
                }catch(err){
                    alert(err.response.data.msg)
                }
            }
                getPostuser(userid)
            
    },[userid,callback])

        ////set post to delete//////////////////
        const deletepost=async(id,public_id)=>{
            try{
                setLoading(true)
                const destroyImg =Axios.post('/api/destroy',{public_id},{
                    headers:{Authorization: token}
                })

                const deletepost=Axios.delete(`/api/delete/${id}`,{
                    headers:{Authorization: token}
                    
                })

                await destroyImg
                await deletepost

                setCallback(!callback)
                setLoading(false)
    
                history.push(`/mypost/${userid}`)
    
            }catch(err){
                alert(err.response.data.msg)
            }
        }
        ///////////////////////////




if(loading) return <div ><Loading/></div>
    return (
        <div className="row">
            <div className="container">
               
               <br></br>

               <div className="post_page">
                    {   selfPost.map(post=>{
                        return <PostItem key={post._id} post={post} deletepost={deletepost} /> })
                    }
               </div>
         
                      
               {/* BUTTON CREATE */}
               <div className="post_page">
                   <Link to="/create/post/"> 
                        <button className="addbutton">
                            <img alt="addpost" className="add" src={add}/>
                        </button>
                    </Link>
                </div>
                {/* CREATE */}


            </div>
        </div>
    )
}

export default AdminPost

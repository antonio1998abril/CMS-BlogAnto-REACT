import React, { useContext, useEffect, useRef, useState } from 'react'
import {GlobalState} from '../../../GlobalState'
import { useParams } from 'react-router-dom'
import FormInput from '../commentSection/FormInput/FormInput'
import {getData} from '../FetchData'
import Loading from '../../icon/loading.gif'
import DetailPost from '../commentSection/DescriptionRoom/DetailPost'
import CommentItem from '../commentSection/commentItem/CommentItem'
///getpost
import axios from 'axios'
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faStar} from '@fortawesome/free-solid-svg-icons'

function PageRoom() {
    const state=useContext(GlobalState)
    //////////////////////SOCKETIO/////////////7
    const {id}=useParams()
/*     const [post]=state.post */
/*     const [detailPost,setDetailPost]=useState([]) */
    const socket=state.socket
    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(false)
    const [rating, setRating] = useState(0)
    const [page, setPage] = useState(1)
    const pageEnd = useRef()

    const [post,setPost]=useState({});
    ///Get rating per user

    //Enlarge comment section
    useEffect(() => {
        setLoading(true)
        getData(`/api/comments/${id}?limit=${page * 5}`)
            .then(res => {
                setComments(r => r = res.data.comments)
                setLoading(false)
            })
            .catch(err => console.log(err.response.data.msg))
    },[id, page])

    ///post
/*     useEffect(() => {
        setDetailPost(post.filter(post => post._id === id))
    },[id, post]) */
////////////////////////////////GET POST ID//////////////////////////
const [postimage,setPostimage]=useState('');
const [byuser,setByuser]=useState([])
const userid=localStorage.getItem("userid")
const [userRating,setUserRating]=useState('')
useEffect(()=>{
    const getPosts=async(id)=>{
        const res=await axios.get(`/api/get/${id}`)
        setPost(res.data.result)
        setPostimage(res.data.result.images.url)
        setByuser(res.data.result.user)
        
    }
    const getUserRating=async(id,userid)=>{
        const res=await axios.get(`/user/perating/${id}`,{
        headers: {User:userid}  
        })
            let value=res.data.result
            
            if (value!=null){
                setUserRating(res.data.result.rating)
            }
    }
         getPosts(id)
    if(userid)
        getUserRating(id,userid)    
},[id,userid])
//////////////////////////////////////////////////////////////////////
/////////////////////////////////GET USER RATE//////////////////////

//useEffect(()=>{
    //const res=await axios.get(`/api/perating/${id}`)
//},[])
///////////////////////////////////////////////////////////////////
    //join to socket io
    useEffect(()=>{
        if(socket){
            socket.emit('joinRoom',id)
        }
    },[socket,id])
    ///////Send Comments
    useEffect(()=>{
        if(socket){
            socket.on('sendCommentToClient',msg=>{
               setComments([msg,...comments])
            })
            return ()=> socket.off('sendCommentToClient')
        }
    },[socket,comments])


      // infiniti scroll
      useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            if(entries[0].isIntersecting){
                setPage(prev => prev + 1)
            }
        },{
            threshold: 0.1
        })

        observer.observe(pageEnd.current)
    },[])

         // Reply Comments
         useEffect(() => {
            if(socket){
                socket.on('sendReplyCommentToClient', msg => {
                    const newArr = [...comments]
                    
                    newArr.forEach(cm => {
                        if(cm._id === msg._id){
                            cm.reply = msg.reply
                        }
                    })
    
                    setComments(newArr)
                })
    
                return () => socket.off('sendReplyCommentToClient')
            } 
        },[socket, comments])
////////////////////////////////////////////////////////////////////GET_POST_DONE
if(userRating){

}

        return (
            <div className="detail_post_page">
                {
                  /*   post.map(post=>(
                        <DetailPost key={post._id} post={post}/>
                    )) */
                    <DetailPost key={post._id} post={post} image={postimage}  byuser={byuser}/>
                }
                <div className="comments">
                    <h2 className="app_title">Socket io</h2>
             {/*        <i className="fa fa-star-o" aria-hidden="true"></i> */}
          {/*    <i><FontAwesomeIcon icon={faStar} aria-hidden="true"/></i> */}
                
                  <div className="reviews">
                        <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                        <label htmlFor="rd-5"><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                        <label htmlFor="rd-4"><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                        <label htmlFor="rd-3" ><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                        <label htmlFor="rd-2" ><i><FontAwesomeIcon icon={faStar} /></i></label>
    
                        <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                        <label htmlFor="rd-1" ><i><FontAwesomeIcon icon={faStar} /></i></label>
                    </div> 


                    {/* text field */}    
                    <FormInput id={id} socket={socket} rating={rating} />
                    {/* Comment list */}
                    <div className="comments_list">
                        {
                            comments.map(comment => (
                                <CommentItem key={comment._id} comment={comment} socket={socket} />
                            ))
                        }
                    </div>
                </div>
                {
                    loading && <div className="loading"><img src={Loading} alt=""/></div>
                }  
                <button ref={pageEnd} style={{opacity: 0}}>Load more</button>  
            </div>
        )
}

export default PageRoom

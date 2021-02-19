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
 

function PageRoom() {
    
   
    //////////////////////SOCKETIO/////////////7
    const {id}=useParams()
    const state=useContext(GlobalState)
/*     const [post]=state.post */
/*     const [detailPost,setDetailPost]=useState([]) */
    const socket=state.socket
    const [comments,setComments]=useState([])
    const [loading,setLoading]=useState(false)
    const [rating, setRating] = useState(0)
    const [page, setPage] = useState(1)
    const pageEnd = useRef()

    const [post,setPost]=useState({});
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
const [byuser,setByuser]=useState({})
useEffect(()=>{
   
    const getPosts=async(id)=>{
        const res=await axios.get(`/api/get/${id}`)
      
        setPost(res.data.result)
        setPostimage(res.data.result.images.url)
        setByuser(res.data.result.user)
    }
    getPosts(id)
},[id])
//////////////////////////////////////////////////////////////////////

/////////////////////////////////GET USER RATE//////////////////////

///////////////////////////////////////////////////////////////////

    //join to socket io
    useEffect(()=>{
        if(socket){
            socket.emit('joinRoom',id)
        }
    },[socket,id])
    ///
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
              
                 <div className="reviews">
                        <input type="radio" name="rate" id="rd-5" onChange={() => setRating(5)} />
                        <label htmlFor="rd-5" className="fas fa-star"></label>
    
                        <input type="radio" name="rate" id="rd-4" onChange={() => setRating(4)} />
                        <label htmlFor="rd-4" className="fas fa-star"></label>
    
                        <input type="radio" name="rate" id="rd-3" onChange={() => setRating(3)} />
                        <label htmlFor="rd-3" className="fas fa-star"></label>
    
                        <input type="radio" name="rate" id="rd-2" onChange={() => setRating(2)} />
                        <label htmlFor="rd-2" className="fas fa-star"></label>
    
                        <input type="radio" name="rate" id="rd-1" onChange={() => setRating(1)} />
                        <label htmlFor="rd-1" className="fas fa-star"></label>
                    </div>
                    <FormInput id={id} socket={socket} rating={rating} />
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

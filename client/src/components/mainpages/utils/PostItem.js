import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrash,faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom'


function PostItem({post,deletepost}) {
    const state=useContext(GlobalState)
      const [isLogged]=state.userAPI.isLogged


    var isUser=false

    const stylecard={
        width:'30rem'
    }


    if(isLogged){
        isUser=true
    }else{
      isUser=false
    }


    return (
     
            <div className="card postcard"  style={stylecard}/* Style="width: 21rem;" */>
                <img src={post.images.url} className="card-img-top" alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5><small>Made by {post.user.name}</small>
                    <p className="card-text">
                    {post.content}
                    </p>
               
                    {isUser ? (
                        <div>
                    <Link to="#!" onClick={()=>deletepost(post._id,post.images.public_id)} className="btn btn-danger btn-flat "  >    
                        <i><FontAwesomeIcon icon={faTrash} /></i> 
                    </Link>&nbsp;
                    <Link className="btn bg-warning btn-flat" id="btn_view" to={`/edit/post/${post._id}`}>
                        <i><FontAwesomeIcon icon={faEdit} /></i>
                    </Link>&nbsp;
                    <Link className="btn bg-info btn-flat" id="btn_view" to={`/post/${post._id}`}>
                        <i><FontAwesomeIcon icon={faArrowAltCircleRight} /></i>
                    </Link>             
                        </div>
                    ):(
                        <a href="#!" className="btn btn-primary">See</a>
                    )}
                  
                </div>
            </div>
      
    )
}

export default PostItem
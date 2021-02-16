import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash} from '@fortawesome/free-solid-svg-icons'
import { Link} from 'react-router-dom'


function PostItem({post,deletepost}) {
    const state=useContext(GlobalState)
      const [isLogged]=state.userAPI.isLogged


    var isUser=false

    const stylecard={
        width:'21rem'
    }


    if(isLogged){
        isUser=true
    }else{
      isUser=false
    }


    return (
     
            <div className="card"  style={stylecard}/* Style="width: 21rem;" */>
                <img src={post.images.url} className="card-img-top" alt="..."
                />
                <div className="card-body">
                    <h5 className="card-title">{post.title}</h5><small>Made by {post.user.name}</small>
                    <p className="card-text">
                    {post.content}
                    </p>
               
                    {isUser ? (
                        <div>
                    {/*         <a href="#!" className="btn btn-primary">See</a>&nbsp;
                            <a href="#!" className="btn btn-warning">Update </a>&nbsp;
                            <a href="#!" className="btn btn-danger">Delete</a> */}
                            <Link to="#!" onClick={()=>deletepost(post._id,post.images.public_id)} className="btn btn-danger btn-flat "  >    
                <i><FontAwesomeIcon icon={faTrash} /></i> 
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
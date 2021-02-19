import React from 'react'
import { Link } from 'react-router-dom'

function BeginPage({post}) {
    const stylecard={
        width:'18rem'
    }

    return (
  
        <div className="card begincarg"  style={stylecard}/* Style="width: 21rem;" */>
        <img src={post.images.url} className="card-img-top" alt="..."
        />
        <div className="card-body">
            <h5 className="card-title">{post.title}</h5><small>Made by {post.user.name}</small>
            <p className="card-text">
            {post.content}
            </p>
    
              {/*   <a href="#!" className="btn btn-primary">See</a> */}
                <Link className="btn btn-primary" to={`/post/${post._id}`}>View</Link>
         
          
        </div>
    </div>
    
    )
}

export default BeginPage

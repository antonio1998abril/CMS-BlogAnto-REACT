import React from 'react'

function PostRoom({post}) {
    const stylecard={
        width:'21rem'
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
    
                <a href="#!" className="btn btn-primary">See</a>
         
          
        </div>
    </div>
    )
}

export default PostRoom

import React from 'react'
import Rating from '../../utils/rating/Rating'
import './detailPostCard.css'

function DetailPost({post,image,byuser}) {
    const stylecard={
        width:'100%'
    }
    
    return (
        <div className="card" style={stylecard}>
            <img src={image} className="card-img-top" alt="..."/>  
             
            <div className="card-body">
            <Rating props={post}/>
            <h6 style={{margin: '10px 0'}}>Rating: {post.numReviews}  reviews</h6>

            <div className=" detail_post_card_content">
                <h2>{post.title}</h2>
                <small>Made by {byuser.name}</small>&nbsp;<small> Email:{byuser.email}</small>
                <p>{post.description}</p>
                <h3>Content: {post.content}</h3>
            </div>
            
            </div>
           
       
            
                

              
        
        </div>
    )
}

export default DetailPost



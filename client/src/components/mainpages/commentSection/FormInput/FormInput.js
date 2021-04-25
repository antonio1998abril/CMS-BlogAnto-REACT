import React,{useRef,useEffect, useContext} from 'react'
import './FormInput.css'
import {patchData} from '../../FetchData'
import { GlobalState } from '../../../../GlobalState'

function FormInput({id,socket,rating,setReply,send,name}) {
    const nameRef=useRef()
    const contentRef=useRef()
/* SET NAME AND ID */
const  state= useContext(GlobalState)
const [isLogged]=state.userAPI.isLogged
const loggedname= localStorage.getItem('name')
const setuserid=localStorage.getItem('userid')
/* ///////////////7 */
    useEffect(() => {
        if(name){
            contentRef.current.innerHTML = `
                <a href="#!"
                    style="color: crimson;
                    font-weight: 600;
                    text-transform: capitalize;"
                >${name}: </a>
            `
        }
    },[name])


    const commentSubmit=()=>{
    let username=nameRef.current.value
    if(!username.trim()) username=loggedname
    if(!username.trim()) return alert('Empty Name')
    const content=contentRef.current.innerHTML

    /*     if(!username.trim()) return alert('Empty Name') */
        if(contentRef.current.textContent.trim().length<5)
            return alert('Contents too short,must be at leats 10 character')

        const createdAt=new Date().toISOString()
        if(setuserid.length){
            socket.emit('createComment', {
                username, content, post_id: id, createdAt, rating, send,setuserid
            })
        }else{
            socket.emit('createComment', {
                username, content, post_id: id, createdAt, rating, send
            })

        }
        if(rating && rating !== 0){
            patchData(`/api/post/${id}`,{rating})
            .then(res=>console.log(res))
        }

        contentRef.current.innerHTML=''
       /*      socket.emit('createComment',{
            username, content, post_id:id,createdAt:createdAt,rating
        })  */

        if(setReply) setReply(false)
    }

    return (
        <div className="form_input">
               <p>Name: </p>
            {   isLogged ?  (
                <div>
                 <h4>{loggedname}</h4> 
                 <input type="hidden" ref={nameRef} />
                 </div>
            ):(
             
                <input type="text" ref={nameRef} />
                )
            }

    {/*         <p>Name</p>
            <input type="text" ref={nameRef} /> */}

            <p>Content</p>
            <div ref={contentRef}
                contentEditable="true"
                style={{
                    height: '100px',
                    border: '1px solid #ccc',
                    padding: '5px 10px',
                    outline: 'none'
                }}
            />
            <button onClick={commentSubmit}>Send</button>
        </div>
    )
}

export default FormInput

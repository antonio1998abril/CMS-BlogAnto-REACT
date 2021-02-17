import React, { useContext, useEffect, useState } from 'react'
import {GlobalState} from '../../../GlobalState'
import { useParams } from 'react-router-dom'

function PageRoom() {
    const iduser=localStorage.getItem('userid')
    //////////////////////SOCKETIO/////////////7
    const {id}=useParams()
    const state=useContext(GlobalState)
    const [post]=state.post
    const [detailPost,setDetailPost]=useState([])
    const socket=state.socket
    const [comments,setComments]=useState([])


    useEffect(()=>{
        if(socket){
            socket.emit('joinRoom',id)
        }
    },[socket,id])

    return (
        <div>
            
            cuarto pops
        </div>
    )
}

export default PageRoom

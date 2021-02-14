import React, { useContext } from 'react'
import { GlobalState } from '../../../GlobalState'


function CreatePost() {
    const  state= useContext(GlobalState)
    const [userid]=state.userAPI.userid
    return (
        <div>
               INFO:{userid} 
            create new post
        </div>
    )
}

export default CreatePost

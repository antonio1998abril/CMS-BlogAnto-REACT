import React, { useContext } from 'react'
import {GlobalState} from '../../../GlobalState'

//AQUI MANDE EL VALOR DEL ID DEL USUARIO
function Begin() {
    const  state= useContext(GlobalState)
    const  [globalposts]=state.PostGeneralAPI.globalposts
    
    
    return (
        <div>
           
     
        </div>
    )
} 

export default Begin

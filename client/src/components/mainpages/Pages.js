import React,{useContext} from 'react'
import {Switch,Route}from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import NotFound from './NotFound/NotFound'
import Begin from './Begin/Begin'
import Login from './auth/Login'
import Register from './auth/Register'
import CreatePost from './CreatePost/CreatePost'


function Pages() {
    const  state= useContext(GlobalState)
    const [isLogged]=state.userAPI.isLogged
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Begin}></Route>
                <Route path="/login" exact component={isLogged ? NotFound:Login}></Route>
                <Route path="/register" exact component={isLogged ? NotFound : Register}></Route>
                <Route path="/createpost" exact component={isLogged ? CreatePost:NotFound}></Route>
                <Route path="*" exact component={NotFound}></Route>
            </Switch>
        </div>
    )
}

export default Pages

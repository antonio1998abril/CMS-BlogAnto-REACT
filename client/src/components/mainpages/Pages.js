import React,{useContext} from 'react'
import {Switch,Route}from 'react-router-dom'
import { GlobalState } from '../../GlobalState'
import NotFound from './NotFound/NotFound'
import Begin from './Begin/Begin'
import Login from './auth/Login'
import Register from './auth/Register'
import AdminPost from './CreatePost/AdminPost'
import CreatePost from './CreatePost/CreatePost'

/* socket io */
import PageRoom from './PostRoom/PageRoom'
function Pages() {
    const  state= useContext(GlobalState)
    const [isLogged]=state.userAPI.isLogged
    return (
        <div>
            <Switch>
                <Route path="/" exact component={Begin}></Route>
                <Route path="/login" exact component={isLogged ? NotFound:Login}></Route>
                <Route path="/register" exact component={isLogged ? NotFound : Register}></Route>
                <Route path="/mypost/:id" exact component={isLogged ? AdminPost:NotFound}></Route>
                <Route path="/create/post" exact component={isLogged ? CreatePost:NotFound}></Route>
                <Route path="/edit/post/:id" exact component={isLogged ? CreatePost:NotFound}></Route>
                <Route path="/post/:id" component={PageRoom} exact/>
                <Route path="*" exact component={NotFound}></Route>
            </Switch>
        </div>
    )
}

export default Pages

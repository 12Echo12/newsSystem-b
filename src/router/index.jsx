import React from 'react'
import { HashRouter, Redirect, Route ,Switch} from 'react-router-dom'
import Login from '../views/login'
import NewsSandBox from '../views/nwesbox/index'

export default function MyRouter() {
  return (
    <HashRouter>
          <Switch>
              <Route path="/login" component={Login} />
              <Route path="/" render={() => {
          return (localStorage.getItem("token") ?
            <NewsSandBox></NewsSandBox> :
            <Redirect to="/login" />)
              }} />
         </Switch>
    </HashRouter>
  )
}

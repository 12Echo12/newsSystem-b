import React from 'react'
import { HashRouter, Redirect, Route ,Switch} from 'react-router-dom'
import Login from '../views/login'
import NewsSandBox from '../views/nwesbox/index'
import VisitDetail from '../views/visitnews/visitdetail'
import VisitHome from '../views/visitnews/visithome'

export default function MyRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/news" component={VisitHome} />
        <Route path="/detail/:id" component={VisitDetail} />
        <Route path="/" render={() => {
          return (localStorage.getItem("token") ?
            <NewsSandBox></NewsSandBox> :
            <Redirect to="/login" />)
              }} />
     </Switch>
    </HashRouter>
  )
}

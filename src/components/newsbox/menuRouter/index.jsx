import React, { useEffect, useState } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import RightList from "../../../views/nwesbox/rights-manage/rightlist"
import RoleList from '../../../views/nwesbox/rights-manage/rolelist'
import UserList from '../../../views/nwesbox/user-manage/userlist'
import Home from '../../../views/nwesbox/home'
import NewsAdd from "../../../views/nwesbox/news-manage/newsadd"
import NewsDraft from "../../../views/nwesbox/news-manage/newsdraft"
import NewsCategory from "../../../views/nwesbox/news-manage/newscategory"
import NewsAudit from "../../../views/nwesbox/audit-manage/newsaudit"
import AuditList from "../../../views/nwesbox/audit-manage/auditlist"
import NewsUnpublished from "../../../views/nwesbox/publish-manage/newsunpublished"
import NewsPublished from "../../../views/nwesbox/publish-manage/newspublished"
import NewsSunset from "../../../views/nwesbox/publish-manage/newssunset"
import axios from 'axios'
import NotFound from '../../../views/nwesbox/home/NotFound'
import NewsPreview from '../../../views/nwesbox/news-manage/newspreview'
import NewsUpdate from '../../../views/nwesbox/news-manage/newsupdate'

const menuRouterComMap = {
    "/home": Home,
    "/user-manage/list": UserList,
    "/right-manage/role/list": RoleList,
    "/right-manage/right/list": RightList,
    "/news-manage/add": NewsAdd,
    "/news-manage/draft": NewsDraft,
    "/news-manage/category": NewsCategory,
    "/audit-manage/audit": NewsAudit,
    "/audit-manage/list": AuditList,
    "/publish-manage/unpublished": NewsUnpublished,
    "/publish-manage/published": NewsPublished,
    "/publish-manage/sunset": NewsSunset,
    "/news-manage/preview/:id": NewsPreview,
    "/news-manage/update/:id": NewsUpdate
}

export default function MenuRouter() {
    const [backRouterList, setBackRouterList] = useState([]);
    const checkRoute = (item) => {
        if ((menuRouterComMap[item.key] !== undefined) && (item.pagepermisson === 1 || item.routepermisson === 1))
            return true;
        else
            return false;
    }
    const { role: { rights } } = JSON.parse(localStorage.getItem("token"));
    const checkUserPermisson = (item) => {
        if (rights.includes(item.key))
            return true;
        else
            return false;
    }
    useEffect(() => {
        Promise.all([
            axios.get('http://localhost:8000/rights'),
            axios.get('http://localhost:8000/children')
        ]).then(res => {
            setBackRouterList([
                ...res[0].data,
                ...res[1].data
            ])
        })
    }, [])
  return (
      <Switch>
          {
              backRouterList.map(item => {
                  if (checkRoute(item) && checkUserPermisson(item))
                      return (
                          <Route path={item.key} component={menuRouterComMap[item.key]} exact key={item.key} />
                      )
                  return null
              })
          }
              < Redirect from="/" to="/home" exact/>
          {
              backRouterList.length!==0 && <Route path ="*" component={NotFound}/>
          }
          
        
      </Switch>
  )
}

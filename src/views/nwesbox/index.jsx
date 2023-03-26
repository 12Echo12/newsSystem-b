import React from 'react'
import { Switch,Route, Redirect } from 'react-router-dom'
import SideMenu from './sidemenu'
import TopHeader from './topheader'
import RightList from './rightlist'
import RoleList from './rolelist'
import UserList from './userlist'
import Home from './home'
import NotFound from '../NotFound'
import './index.css'

import { Layout,theme } from 'antd';

const {Content} = Layout

export default function NewsSandBox() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
  return (
      <Layout className='box'>
          <SideMenu></SideMenu>
          <Layout className="site-layout">
              <TopHeader></TopHeader>
              <Content
                  style={{
                      margin: '24px 16px',
                      padding: 24,
                      background: colorBgContainer,
                      overflow:"auto"
                  }}
              >
                  <Switch>
                      <Route path="/home" component={Home} />
                      <Route path="/user-manage" component={UserList} />
                      <Route path="/right-manage/role/list" component={RoleList} />
                      <Route path="/right-manage/right/list" component={RightList} />
                      <Redirect from='/' to="/home" exact />
                      <Route path="*" component={NotFound} />
                  </Switch>
              </Content>
          </Layout>
     </Layout>
  )
}

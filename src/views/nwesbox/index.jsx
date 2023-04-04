import React, { useEffect } from 'react'
import SideMenu from '../../components/newsbox/sidemenu'
import TopHeader from '../../components/newsbox/topheader'
import './index.css'
import { Layout,theme } from 'antd';
import MenuRouter from '../../components/newsbox/menuRouter';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css'

const {Content} = Layout

export default function NewsSandBox() {
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    NProgress.start();
    useEffect(() => {
        NProgress.done();
    })
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
                          overflow: "auto"
                      }}
                  >
                      <MenuRouter></MenuRouter>
                  </Content>
          </Layout>
     </Layout>
  )
}

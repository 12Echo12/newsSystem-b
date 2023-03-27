import React, { useState } from 'react'
import { Layout, theme, Dropdown, Space, Avatar } from 'antd';
import style from './index.module.css'

import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { withRouter } from 'react-router-dom';


const { Header } = Layout;

function TopHeader(props) {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const handleCollapsed = () => {
        setCollapsed(!collapsed);
    }
    const handleWithdraw = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
        props.history.replace('/login');
    }
    const {role:{roleName},username} = JSON.parse(localStorage.getItem("token"))
    const items = [
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    {roleName}
                </a>
            ),
        },
        {
            key: '2',
            danger: true,
            label: (<a  onClick={handleWithdraw}>退出</a>),
        },
    ];
  return (
      <Header style={{ padding: "0 16px", background: colorBgContainer }}>
          {collapsed ? <MenuFoldOutlined size={{width:"20px"}} onClick={handleCollapsed} ></MenuFoldOutlined> : <MenuUnfoldOutlined  onClick={handleCollapsed}></MenuUnfoldOutlined>}
          <div className={style.span}>
              <span>欢迎&nbsp;<b style={{color:"#1890ff"}}>{username}</b>&nbsp;回来</span>   
              {/* 下拉菜单 */}
              <Dropdown className={style.drop}
                  menu={{
                      items,
                  }}
              >
                  <a onClick={(e) => e.preventDefault()}>
                      <Space>
                          <Avatar icon={<UserOutlined />} />
                      </Space>
                  </a>
              </Dropdown>
          </div>
      </Header>
  )
}
export default withRouter(TopHeader)
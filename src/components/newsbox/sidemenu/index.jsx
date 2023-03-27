import React, { useEffect, useState} from 'react';
import { Layout, Menu, theme } from 'antd';
import './index.css'
import {
    DownOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import { useLocation, withRouter, useNavigate } from 'react-router-dom';

const { Sider } = Layout;

const iconList = {
    "/home": <UserOutlined />,
    "/user-manage": <UserOutlined />,
    "/user-manage/list": <UserOutlined />,
    "/right-manage/role/list": <UserOutlined />,
    "/right-manage/right/list": <DownOutlined/>,
}


function SideMenu(props) {
    const [collapsed, setCollapsed] = useState(false);
    const [menu, setMenu] = useState([]);
    const location = useLocation();
    const { role: { rights } } = JSON.parse(localStorage.getItem("token"))
    useEffect(() => {
        axios.get('http://localhost:8000/rights?_embed=children').then((res) => {
            res.data = res.data.filter((ifa) => {
                return ifa.pagepermisson === 1 && rights.includes(ifa.key);
            })
            res.data.map((item) => {
                item.label = item.title.slice();
                item.icon = iconList[item.key];
                if (item.children) {
                    item.children.map((ic) => {
                        ic.label = ic.title.slice();
                        ic.icon = iconList[ic.key];
                    })
                    item.children = item.children.filter((ic) => {
                        return ic.pagepermisson === 1 && rights.includes(ic.key);
                    })
                }
            })
            setMenu(res.data);
        })
    }, [])
    const handleClick = (e) => {
        props.history.push(e.key);
    }
    const handleSelect = (e) => {
        console.log(e);
        // if (e.children.length)
        //     e.preventDefault();
        // else
        // props.history.push(e.key);
    }
    return (
        <Sider trigger={null} collapsible collapsed={collapsed} className="sider">
            <div className="logo1" >全球新闻发布系统</div>
            <Menu
                theme="dark"
                mode="inline"
                selectedKeys= {[location.pathname]}
                defaultOpenKeys={['./home']}
                items={menu}
                onClick={handleClick}
                onSelect={handleSelect}
            />
        </Sider>
  )
}
export default withRouter(SideMenu);
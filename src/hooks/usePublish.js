import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Modal, notification } from 'antd';
import { SmileOutlined, ExclamationCircleFilled } from '@ant-design/icons';

const { confirm } = Modal;

export default function usePublish(type) {
    const user = JSON.parse(localStorage.getItem("token"));
    const [dataSource,setDataSource] = useState([]) ;
    useEffect(() => {
        axios.get(`http://localhost:8000/news?author=${user.username}&publishState=${type}&_expand=category`).then(res => {
            setDataSource(res.data);
        })
    },[])
    const handlePublish = (id) => {
        confirm({
            title: '您确定要发布么?',
            icon: <ExclamationCircleFilled />,
            content: '确定发布点击OK,取消点击Cancel',
            onOk() {
                setDataSource(dataSource.filter(i => i.id !== id));
                axios.patch(`http://localhost:8000/news/${id}`, {
                    publishState: 2,
                    publishTime: Date.now()
                })
                notification.open({
                    message: '通知',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    description:
                        `可以到【发布管理/已发布】一栏中查看您发布的新闻！！`,
                    placement: "bottomRight",
                })
            },
            onCancel() {
            },
        });
    }
    const handleSunset = (id) => {
        confirm({
            title: '您确定要将新闻下线么?',
            icon: <ExclamationCircleFilled />,
            content: '确定下线点击OK,取消点击Cancel',
            onOk() {
                setDataSource(dataSource.filter(i => i.id !== id));
                axios.patch(`http://localhost:8000/news/${id}`, {
                    publishState: 3,
                })
                notification.open({
                    message: '通知',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    description:
                        `您已经成功将您的新闻下线！！`,
                    placement: "bottomRight",
                })
            },
            onCancel() {
            },
        });
    }
    const handleDelete = (id) => {
        confirm({
            title: '您确定要将新闻删除么?',
            icon: <ExclamationCircleFilled />,
            content: '确定下线点击OK,取消点击Cancel',
            onOk() {
                setDataSource(dataSource.filter(i => i.id !== id));
                axios.delete(`http://localhost:8000/news/${id}`, {
                    publishState: 3,
                })
                notification.open({
                    message: '通知',
                    icon: <SmileOutlined style={{ color: '#108ee9' }} />,
                    description:
                        `您已经成功将您已经下线的新闻删除！！`,
                    placement: "bottomRight",
                })
            },
            onCancel() {
            },
        });
    }
    return {
        dataSource,
        handleDelete,
        handlePublish,
        handleSunset
    }
}

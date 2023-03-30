import { Button, Tag, Table, notification } from 'antd';
import { SmileOutlined} from '@ant-design/icons';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function NewsAudit() {
  // 表的配置
  const columns = [
    {
      title: "新闻标题",
      dataIndex: 'title',
    },
    {
      title: "作者",
      dataIndex: 'author',
    },
    {
      title: "新闻分类",
      dataIndex: 'category',
      render: (category) => <Tag>{category.title}</Tag>,
    },
    {
      title: "操作",
      render: (item) =>
        <div>
          <Button type="primary" onClick={()=>handlePass(item)}>通过</Button>&nbsp;
          <Button danger onClick={()=>handleNo(item)}>驳回</Button>
        </div>
    }
  ];
  const [dataSource, setDataSource] = useState([]);
  const user = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios.get(`http://localhost:8000/news?auditState=1&_expand=category&_expand=role`).then(res => {
      let list = res.data;
      console.log(list);
      setDataSource(user.role.roleName === "超级管理员" ? list : list.filter(i => {
        return i.author === user.username || (i.region === user.region && i.role.roleName==='区域编辑')
      }))
    })
  }, [])
  const handlePass = (item) => {
    setDataSource(dataSource.filter(i => i.id !== item.id))
    axios.patch(`http://localhost:8000/news/${item.id}`, {
      auditState: 2,
      publishState: 1
    }).then(res => {
      notification.open({
        message: '通知',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        description:
          `可以到【审核管理/审核列表】一栏中查看您提交新闻的审核状态！！`,
        placement: "bottomRight",
      })
    })
  }
  const handleNo = (item) => {
    setDataSource(dataSource.filter(i => i.id !== item.id))
    axios.patch(`http://localhost:8000/news/${item.id}`, {
      auditState: 3,
      publishState: 1
    }).then(res => {
      notification.open({
        message: '通知',
        icon: <SmileOutlined style={{ color: '#108ee9' }} />,
        description:
          `可以到【审核管理/审核列表】一栏中查看您提交新闻的审核状态！！`,
        placement: "bottomRight",
      })
    })
  }
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
    </div>
  )
}

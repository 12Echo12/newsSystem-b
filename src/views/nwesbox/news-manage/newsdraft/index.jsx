import React, { useEffect, useState } from 'react'
import { Button, Table, Modal, notification } from 'antd';
import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled,
  UploadOutlined 
} from '@ant-design/icons';
const { confirm } = Modal;


export default function RightList(props) {
  const [dataSource, setDataSource] = useState([]);
  const user = JSON.parse(localStorage.getItem("token"));
  // 表的配置
  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
    },
    {
      title: "新闻标题",
      dataIndex: 'title',
      render: (title,item) => {
        return <a onClick={() => { props.history.push(`/news-manage/preview/${item.id}`)}}>{title}</a>
      }
    },
    {
      title: "作者",
      dataIndex: 'author',
    },
    {
      title: "分类",
      dataIndex: 'category',     
      render: (category) => {
        return <span>{category.title}</span>
      }
    },
    {
      title: "操作",
      render: (item) =>
        <div>
          <Button shape="circle" icon={<EditOutlined />} onClick={(() => { props.history.push(`/news-manage/update/${item.id}`)})}/>
          &nbsp;
          {/* 点击的话会弹出确认框哦 */}
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => handleConfirm(item)} />
          &nbsp;
          <Button shape="circle" type="primary" icon={<UploadOutlined />} onClick={() => handleCheck(item.id)} />
        </div>
    }
  ];
  // 删除的事件处理
  const handleDelete = (item) => {
    setDataSource(dataSource.filter(i => {
      return i.id !== item.id;
    }));
      axios.delete(`http://localhost:8000/news/${item.id}`)
  }
  // 提交审核事件处理
  const handleCheck = (id) => {
    console.log(props)
    axios.patch(`http://localhost:8000/news/${id}`, {
      "auditState": 1,
    }).then(res => {
        props.history.push("/audit-manage/list")
      // 从 antd 引进来的提交后的通知框！！
      notification.open({
        message: '通知',
        description:
          `可以到审核列表中查看您提交的新闻！！`,
        placement: "bottomRight",
      });
    }).catch(err => {
      console.log(err);
    })
  }
  // 弹出确认框的事件
  const handleConfirm = (item) => {
    confirm({
      title: '您确定要删除么?',
      icon: <ExclamationCircleFilled />,
      content: '确定删除点击OK,取消点击Cancel',
      onOk() {
        handleDelete(item);
      },
      onCancel() {
      },
    });
  }
  useEffect(() => {
    axios.get(`http://localhost:8000/news?author=${user.username}&auditState=0&_expand=category`).then((res) => {
      setDataSource(res.data);
    })
  }, [])
  return (
    <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} rowKey={(item)=>item.id} />
  )
}

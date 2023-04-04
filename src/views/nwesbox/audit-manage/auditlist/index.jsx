import React, { useEffect, useState } from 'react'
import { Button, notification, Table, Tag ,Modal} from 'antd';
import { SmileOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import axios from 'axios';
import moment from 'moment';

const { confirm } = Modal;

export default function AuditList(props) {
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
      title: "审核状态",
      dataIndex: 'auditState',
      render: (a) => <Tag color={colorList[a]}>{auditState[a]}</Tag>,
    },
    {
      title: "操作",
      render: (item) =>
        <Button type="primary" onClick={()=>handleOperate(item)}>{operateList[item.auditState]}</Button>
    }
  ];
  const auditState = ['未审核', '审核中', '已通过', '未通过'];
  // const publishState = ['未发布', '待发布', '已上线', '已下线'];
  const operateList = ['', '撤销', '发布', '修改'];
  const colorList = ["black", "orange", "green", "red"];
  const user = JSON.parse(localStorage.getItem("token"));
  const [dataSource, setDataSource] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/news?author=${user.username}&auditState_ne=0&publishState_lte=1&_expand=category`).then(res => {
      setDataSource(res.data);
      console.log(res.data)
    })
  }, [])
  // 弹出确认框的事件
  const handleConfirm = (item) => {
    confirm({
      title: '您确定要发布么?',
      icon: <ExclamationCircleFilled />,
      content: '确定发布点击OK,取消点击Cancel',
      onOk() {
        setDataSource(dataSource.filter(i => i.id !== item.id));
        axios.patch(`http://localhost:8000/news/${item.id}`, {
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
  const handleOperate = (item) => {
    switch (item.auditState) {
      case 1:
        setDataSource(dataSource.filter(i => i.id !== item.id));
        axios.patch(`http://localhost:8000/news/${item.id}`, {
          auditState: 0,
        }).then(res => {
          notification.open({
            message: '通知',
            icon: <SmileOutlined style={{ color: '#108ee9' }} />,
            description:
              `可以到草稿箱中查看您撤销的新闻！！`,
            placement: "bottomRight",
          });
        });
        break;
      case 2:
        handleConfirm(item);
        break;
      case 3:
        props.history.push(`/news-manage/update/${item.id}`);
        break;
    }
  }
  return (
    <div>
      <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
    </div>
  )
}

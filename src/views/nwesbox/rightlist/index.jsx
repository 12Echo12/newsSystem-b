import React, { useEffect, useState } from 'react'
import { Button, Table, Popover, Modal, Tag ,Switch} from 'antd';
import axios from 'axios';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
const { confirm } = Modal;


export default function RightList() {
  const [dataSource, setDataSource] = useState([]);
  // 表的配置
  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
    },
    {
      title: "权限名称",
      dataIndex: 'title',
    },
    {
      title: "权限路径",
      dataIndex: 'key',
      render: (text) => <Tag color={"gold"}>{text}</Tag>,
    },
    {
      title: "操作",
      render: (item) =>
        <div>
          {/* 冒泡提示框 */}
          <Popover
            content={
              <div style={{ textAlign: "center" }}>
                {/* 开关  ,开关可以通过 checked 属性值控制!!!*/}
               <Switch checked={item.pagepermisson} onChange={()=>handleSwitch(item)} />
             </div>}
            title="页面配置项"
            // 配置触发的事件，如果是""就说明永远不会触发，即点击也没用了
            trigger={(item.pagepermisson == 1 || item.pagepermisson === 0) ? "click" : ""
          }>
            {/* 按钮的内容也可以是icon图标哦 , 给按钮加上 disabled 属性可以使按钮禁用哦!!! */}
            <Button  shape="circle" icon={<EditOutlined />} disabled={!(item.pagepermisson == 1 || item.pagepermisson === 0)} />
          </Popover>

          &nbsp;
          {/* 点击的话会弹出确认框哦 */}
          <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => handleConfirm(item)} />

        </div>
    }
  ];
  // 开关的事件处理
  const handleSwitch = (item) => {
    item.pagepermisson = item.pagepermisson === 0 ? 1 : 0;
    setDataSource([...dataSource]);
    if (item.grade === 1)
      axios.patch(`http://localhost:8000/rights/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    else
      axios.patch(`http://localhost:8000/children/${item.id}`, {
        pagepermisson: item.pagepermisson
      })
    console.log(item.pagepermisson);
  }
  // 删除的事件处理
  const handleDelete = (item) => {
    if (item.grade === 1) {
      setDataSource(dataSource.filter((i) => i.id !== item.id))
      axios.delete(`http://localhost:8000/rights/${item.id}`)
    } else {
      dataSource.map((i) => {
        if (i.id === item.rightId) {
          i.children = i.children.filter((a)=> a.id !== item.id)
        }
      })
      setDataSource([...dataSource]);
      axios.delete(`http://localhost:8000/children/${item.id}`)
    }
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
    axios.get('http://localhost:8000/rights?_embed=children').then((res) => {
      setDataSource(res.data);
    })
  },[])
  return (
    <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 5 }} />
  )
}

import React, { useEffect, useState ,useRef} from 'react'
import { Switch, Button, Table, Form, Input, Modal, Select} from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import axios from 'axios';
import './index.css'
import UserForm from '../../../../components/user-manage/userForm/index';

const { confirm } = Modal;

export default function UserList() {
  const [dataSource, setDataSource] = useState([]);
  const [addOpen, setAddOpen] = useState(false);
  const [roleList, setRoleList] = useState([]);
  const [regionList, setRegionList] = useState([]);
  const [currentId, setCurrentId] = useState();
  const addRef = useRef();
  const updateRef = useRef();
  const [updateOpen, setUpdateOpen] = useState(false);
  const { region, roleId ,username} = JSON.parse(localStorage.getItem("token"));
  useEffect(() => {
    axios.get('http://localhost:8000/users?_expand=role').then((res) => {
      let list = res.data;
      setDataSource(roleId===1?list:[
        ...list.filter((i) => i.username === username),
        ...list.filter((i) => i.region===region && i.roleId===3)
      ]);
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then((res) => {
      setRoleList(res.data);
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/regions').then((res) => {
      setRegionList(res.data);
    })
  }, [])
  const columns = [
    {
      title: '区域',
      dataIndex: 'region',
      render: (region) => {
        return <div>{region === ""? "全球":region}</div>
      },
      filters: [
      {
        text: "全球",
        value : "全球"
        }, ...regionList.map((item) => {
          return {
            text: item.title,
            value: item.value
          }
        })],
      onFilter: (value, record) => {
        if (value === "全球")
          return record.region=== ""
        else
          return value === record.region
      },
    },
    {
      title: '角色名称',
      dataIndex: 'role',
      render: (item) => {
        return <div>{item.roleName}</div>
      }
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '用户状态',
      dataIndex: 'roleState',
      render: (roleState,item) => {
        return <Switch checked={roleState} onChange={()=>handleSwitch(item)} disabled={item.default} />;
      }
    },
    {
      title: '操作',
      render: (item) => {
    return (
      <div>
        <Button shape="circle" icon={<EditOutlined />} disabled={item.default} onClick={() => { handleUpdate(item); setCurrentId(item.id)}} />
        &nbsp;
        <Button danger shape="circle" icon={<DeleteOutlined />} disabled={item.default} onClick={() => { confirmMethod(item.id) }} />
      </div>
        )
      }
    },

  ]
  const CollectionAddForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="添加用户"
        okText="确定"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          addRef.current.validateFields().then((value) => {
            setAddOpen(false);
            addRef.current.resetFieldValue();
            axios.post('http://localhost:8000/users', {
              ...value,
              "roleId": ["超级管理员","区域管理员","区域编辑"].indexOf(value.roleId)+1,
              "roleState": true,
              "default": false
            }).then((res) => {
              console.log(res.data);
              res.data = {
                ...res.data,
                role: roleList.filter((item) => item.roleId == value.roleId)[0]
              }
              setDataSource([...dataSource, res.data]);
              console.log(dataSource);
            });
          }).catch(err=> console.log(err))

        }}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={addRef} isAdd={true} />
      </Modal>
    )
  }
  const CollectionUpdateForm = ({ open, onCreate, onCancel }) => {
    const [form] = Form.useForm();
    return (
      <Modal
        open={open}
        title="更新用户"
        okText="更新"
        cancelText="取消"
        onCancel={onCancel}
        onOk={() => {
          updateRef.current.validateFields().then((value) => {
            setUpdateOpen(false);
            console.log(value)
            setDataSource(dataSource.map((i) => {
              if (i.id === currentId)
                i = {
                  ...i,
                  ...value,
                  role: roleList.filter((item) => item.roleName === value.roleId)[0]
                }
              return i;
            }))
            axios.patch(`http://localhost:8000/users/${currentId}`, value)
          }).catch(err => console.log(err))
        }}
      >
        <UserForm roleList={roleList} regionList={regionList} ref={updateRef} />
      </Modal>
    )
  }
  const confirmMethod = (id) => {
    confirm({
      title: '您确定删除咩?',
      icon: <ExclamationCircleFilled />,
      content: '确定删除请点击OK,取消点击Cancel',
      onOk() {
        setDataSource(dataSource.filter((i) => i.id !== id));
        axios.delete(`http://localhost:8000/users/${id}`);
      }
    })
  }
  const handleSwitch = (item) => {
    setDataSource(dataSource.map( i => {
      if (i.id === item.id)
        i.roleState = !i.roleState
        return i;
    }))
    axios.patch(`http://localhost:8000/users/${item.id}`, {
      roleState: item.roleState
    })
  }
  async function handleUpdate(item){
    await setUpdateOpen(true) 
    console.log(item);
    await updateRef.current.setFieldsValue({...item,roleId:item.role.roleName});
  }
  return (
    <div>
      <Button type="primary" onClick={()=>{setAddOpen(true)}}>添加用户</Button>
      <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 5 }} />;
      <CollectionAddForm
        open={addOpen}
        onCancel={() => {
          setAddOpen(false);
        }}
      />
      <CollectionUpdateForm
        open={updateOpen}
        onCancel={() => {
          setUpdateOpen(false);
        }}
      />
    </div>
  )
}

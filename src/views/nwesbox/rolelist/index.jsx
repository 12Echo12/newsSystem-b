import { Table ,Button ,Modal ,Tree} from 'antd'
import React, { useEffect ,useState} from 'react'
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import axios from 'axios';

const { confirm } = Modal;

export default function RoleList() {
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      render: (id) => {
        return <b>{id}</b>
      }
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
    },
    {
      title: '操作',
      dataIndex: 'id',
      render: (id) => {
      return (<div>
        <Button shape="circle" icon={<EditOutlined />} onClick={()=>handleTreeVisible(id)} />
        &nbsp;
        <Button danger shape="circle" icon={<DeleteOutlined />} onClick={() => { confirmMethod(id) }} />
        </div>)
      }
    },
  ]
  const [dataSource, setDataSource] = useState([]);
  const [treeVisible, setTreeVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [currentTreeData, setCurrentTreeData] = useState([]);
  const [currentId, setCurrentId] = useState();
  useEffect(() => {
    axios.get('http://localhost:8000/roles').then((res) => {
      res.data.map((i) => {
        i.key = i.id;
      })
      setDataSource(res.data);
    })
  }, [])
  useEffect(() => {
    axios.get('http://localhost:8000/rights?_embed=children').then((res) => {
      setTreeData(res.data);
    })
  },[])
  const confirmMethod = (id) => {
    confirm({
      title: '您确定删除咩?',
      icon: <ExclamationCircleFilled />,
      content: '确定删除请点击OK,取消点击Cancel',
      onOk() {
        setDataSource(dataSource.filter((i) => i.id !== id));
        axios.delete(`http://localhost:8000/roles/${id}`);
      }
    })
  }
  const handleTreeVisible = (id) => {
    console.log(treeData);
    setTreeVisible(true);
    setCurrentTreeData(dataSource[id - 1].rights);
    setCurrentId(id);
  }
  const handleOk = () => {
    setTreeVisible(false);
    setDataSource(dataSource.map(item => {
      if (item.id === currentId) {
        return {
          ...item,
          rights: currentTreeData
        }
      }
      else
        return item;
    }));
    axios.patch(`http://localhost:8000/roles/${currentId}`, {
      rights: currentTreeData,
    })
  }
  const handleCancel = () => {
    setTreeVisible(false);
  }
  const handleCheck = (checkedKeys) => {
    setCurrentTreeData(checkedKeys.checked);
  }
  return (
  <div>
      <Table dataSource={dataSource} columns={columns} />
      <Modal title="权限设置" open={treeVisible} onOk={handleOk} onCancel={handleCancel}>
        <Tree
          checkable
          checkedKeys={currentTreeData}
          treeData={treeData}
          onCheck={(checkedKeys) => handleCheck(checkedKeys)}
          checkStrictly = {true}
        />
      </Modal>
  </div>
  )
}

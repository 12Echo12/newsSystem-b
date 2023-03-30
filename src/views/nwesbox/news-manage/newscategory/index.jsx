import { Button, Form, Input,  Table ,Modal} from 'antd';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  DeleteOutlined,
  EditOutlined,
  ExclamationCircleFilled
} from '@ant-design/icons';
import axios from 'axios';
import './index.css'

const { confirm } = Modal;
export default function NewsCategory() {
  // 表的配置
  const columns = [
    {
      title: "ID",
      dataIndex: 'id',
    },
    {
      title: "栏目名称",
      dataIndex: 'title',
      onCell: (record) => ({
        record,
        handleSave:handleSave,
        editable: true,
        dataIndex: 'title',
        title:'栏目名称',
      }),
    },
    {
      title: "操作",
      render: (item) => {
        return (
          <Button danger shape = "circle" icon = {< DeleteOutlined />} onClick = {() => handleConfirm(item)} />
        )
      }
    }
  ];
  const EditableContext = React.createContext(null);
  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };
  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    const save = async () => {
      try {
        const values = await form.validateFields();
        toggleEdit();
        handleSave({
          ...record,
          ...values,
        });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
        </Form.Item>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };
  const [dataSource, setDataSource] = useState([]);
  const handleSave = (record) => {
    setDataSource(dataSource.map(i => {
      if (i.id === record.id) {
        return {...i,title:record.title,value:record.title}
      }
      return i;
    }))
    axios.patch(`http://localhost:8000/categories/${record.id}`, {
      title: record.title,
      value:record.value
    })
  }
  // 删除的事件处理
  const handleDelete = (item) => {
      setDataSource(dataSource.filter(i=> i.id !== item.id))
      axios.delete(`http://localhost:8000/categories/${item.id}`)
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
    axios.get(`http://localhost:8000/categories`).then(res => {
      setDataSource(res.data);
    })
  },[])
  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      rowClassName={() => 'editable-row'}
      components={
        {
          body: {
            row: EditableRow,
            cell: EditableCell,
          }
        }
      }
      pagination={{ pageSize: 5 }}
    />
  )
}

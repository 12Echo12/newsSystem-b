import React, { useState, forwardRef } from 'react'
import { Form, Input, Modal, Select } from 'antd';

const {Option} = Select


const UserForm = forwardRef((props,ref) => {
    const [form] = Form.useForm();
    const { roleList, regionList } = { ...props };
    const [regionDisabled, setRegionDisabled] = useState(false);
    const { region, roleId, username } = JSON.parse(localStorage.getItem("token"));
    const handleRoleChange = (i) => {
      if (i === "超级管理员") {
        setRegionDisabled(true);
        ref.current.setFieldsValue({
          region:''
        })
      }
      else
        setRegionDisabled(false);
  }
    const isRegionDisabled = (value) => {
      if (props.isAdd) {
        if (roleId === 1)
          return false;
        else {
          return value !== region;
        }
      } else {
        if (roleId === 1)
          return false;
        else {
          return true;
        }
          
      }
  }
  const isRoleDisabled = (value) => {
    if (props.isAdd) {
      if (roleId === 1)
        return false;
      else {
        console.log(value)
        return value !== 3;
      }
    } else {
      if (roleId === 1)
        return false;
      else {
        return true;
      }

    }
  }
    return (
      <Form
        ref = {ref}
        form={form}
        layout="vertical"
      >
        <Form.Item
          name="username"
          label="用户名"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="region"
          label="区域"
          rules={regionDisabled ? [] : [
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select
            defaultValue=""
            disabled={regionDisabled}
          >
            {
              regionList.map(item => {
                return(
                  <Option value={item.value} key={item.id} disabled={isRegionDisabled(item.value)}>
                    {item.title}
                  </Option>
                )
              })
            }
          </Select>
        </Form.Item>
        <Form.Item
          name="roleId"
          label="角色"
          rules={[
            {
              required: true,
              message: 'Please input the title of collection!',
            },
          ]}
        >
          <Select
            defaultValue=""
            onChange={(i) => handleRoleChange(i)}
          >
            {
              roleList.map(item => {
                return (
                  <Option value={item.id} key={item.id} disabled={isRoleDisabled(item.id)}>
                    {item.roleName}
                  </Option>
                )
              })
            }
          </Select>
        </Form.Item>
      </Form>

    )
}) 
export default UserForm
import React, { useState, forwardRef } from 'react'
import {Form, Input, Modal, Select } from 'antd';

const UserForm = forwardRef((props,ref) => {
    const [form] = Form.useForm();
    const { roleList, regionList } = { ...props };
    const [regionDisabled, setRegionDisabled] = useState(false);
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
            options={regionList}
            disabled={regionDisabled}
          />
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
            options={roleList.map((i) => { i.value = i.roleName; return i })}
            onChange={(i) => handleRoleChange(i)}
          />
        </Form.Item>
      </Form>

    )
}) 
export default UserForm
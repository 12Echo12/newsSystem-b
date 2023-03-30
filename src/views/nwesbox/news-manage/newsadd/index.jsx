import React, { useEffect, useRef, useState } from 'react'
import { PageHeader } from '@ant-design/pro-layout';
import { Button, Steps, Form, Input, Select,notification} from 'antd';
import './index.css'
import axios from 'axios';
import NewsEditor from '../../../../components/news-manage/newseditor';

const { Option } = Select;
export default function NewsAdd(props) {
  const [current, setCurrent] = useState(0);
  const [categoriesList, setCategoriesList] = useState([]);
  const [content, setContent] = useState();
  const [newsInfo, setNewsInfo] = useState();
  const newsRef = useRef();
  const user = JSON.parse(localStorage.getItem("token"));
  const handlePre = () => {
    setCurrent(current - 1);
  }
  const handleNext = () => {
    if (current === 0) {
      newsRef.current.validateFields().then(res => {
        setNewsInfo(res);
        setCurrent(current + 1);
      }).catch(err=>{
        console.log(err);
      })
    } else
      setCurrent(current + 1);
  }
  const getContent = (value) => {
    setContent(value);
  }
  const handleSave = (auditState) => {
    axios.post("http://localhost:8000/news", {
      ...newsInfo,
      "content": content,
      "region": user.region? user.region:"全球",
      "author": user.username,
      "roleId": user.roleId,
      "auditState": auditState,
      "publishState": 0,
      "createTime": Date.now(),
      "star": 0,
      "view": 0
    }).then(res => {
      if (auditState === 0)
        props.history.push("/news-manage/draft")
      else
        props.history.push("/audit-manage/list")
      // 从 antd 引进来的提交后的通知框！！
       notification.open({
        message: '通知',
        description:
           `可以到${auditState === 0 ? "草稿箱" : "审核列表"}中查看您提交的新闻！！`,
         placement:"bottomRight",
      });
    }).catch(err => {
      console.log(err);
    })
  }
  
 
  useEffect(() => {
    axios.get('http://localhost:8000/categories').then((res) => {
      setCategoriesList(res.data);
    })
  },[])
  return (
    <div>
      <PageHeader title="撰写新闻"/>
      <Steps
        current={current}
        items={[
          {
            title: '基本信息',
            description:'新闻标题，新闻分类',
          },
          {
            title: '新闻内容',
            description:'新闻主题内容',
          },
          {
            title: '新闻提交',
            description:'保存至草稿或提交审核',
          },
        ]}
      />
      <div className="change" style={{marginTop:"50px"}}>
        <div className={current === 0 ? "" : "hide"}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            ref = {newsRef}
          >
            <Form.Item
              label="新闻标题"
              name="title"
              rules={[{ required: true, message: '新闻标题不能为空！！' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="新闻分类"
              name="categoryId"
              rules={[{ required: true, message: '新闻分类不能为空！！' }]}
            >
              <Select>
                {
                  categoriesList.map(item => {
                    return (
                      <Option value = {item.id} key = {item.id}>
                        {item.title}
                      </Option>
                    )
                  })
                }
              </Select>
            </Form.Item>
          </Form>
        </div>
        <div className={current === 1 ? "" : "hide"}>
          <NewsEditor getContent = {getContent}></NewsEditor>
        </div>
        <div className={current === 2 ? "" : "hide"}>
          完成撰写
        </div>
      </div>
      <div className="button" style={{ marginTop: '50px' }}>
        {
          current > 0 && <Button onClick={handlePre}>上一步</Button>
        }
        {
          current < 2 && <Button onClick={handleNext} type="primary">下一步</Button>
        }
        {
          current === 2 && <span><Button onClick={()=>handleSave(0)}>保存至草稿</Button> <Button onClick={()=>handleSave(1)} danger>提交审核</Button></span>
        }
      </div>
    </div>
  )
}

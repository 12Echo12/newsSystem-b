import React, { useEffect, useState } from 'react'
import { Descriptions } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import axios from 'axios';
import moment from 'moment/moment';

export default function NewsPreview(props) {
    const currentId = props.match.params.id;
    const [content, setContent] = useState({});
    useEffect(() => {
        axios.get(`http://localhost:8000/news?id=${currentId}&_expand=category&_expand=role`).then( (res) => {
            setContent(res.data[0]);
            console.log(res.data[0])
        })
    }, [])
    const auditState = ['未审核', '审核中', '已通过', '未通过'];
    const publishState = ['未发布', '待发布', '已上线', '已下线'];
  return (
      <div>
          {
              content && 
              <div>
                      <PageHeader title="返回" onBack={() => props.history.goBack()} />
                      <Descriptions onBack={() => props.history.goBack()} title={content.title} style={{ margin: "0 24px" }}>
                          <Descriptions.Item label="创建者">{content.author}</Descriptions.Item>
                          <Descriptions.Item label="创建时间">{moment(content.createTime).format("YYYY-MM-DD HH:mm:ss")}</Descriptions.Item>
                          <Descriptions.Item label="发布时间">o</Descriptions.Item>
                          <Descriptions.Item label="区域">{content.region}</Descriptions.Item>
                          <Descriptions.Item label="审核状态"><span style={{ color: 'red' }}>{auditState[content.auditState]}</span></Descriptions.Item>
                          <Descriptions.Item label="发布状态"><span style={{ color: 'red' }}>{publishState[content.auditState]}</span></Descriptions.Item>
                          <Descriptions.Item label="访问数量">{content.view}</Descriptions.Item>
                          <Descriptions.Item label="点赞数量">{content.star}</Descriptions.Item>
                          <Descriptions.Item label="评论数量">empty</Descriptions.Item>
                      </Descriptions>
                      <div dangerouslySetInnerHTML={{
                              __html: content.content,
                          }} style={{
                              margin: "0 24px",
                              border: "1px solid gray"
                          }}></div>
              </div>
          }
      </div>
  )
}

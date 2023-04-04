import React, { useEffect, useState } from 'react'
import { PageHeader } from '@ant-design/pro-layout';
import { Card, Col, Row ,List} from 'antd';
import axios from 'axios';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';

function VisitHome(props) {
    const [newsData, setNewsData] = useState([]);
    useEffect(() => {
        axios.get(`http://localhost:8000/news?_expand=category&publishState=2`).then(res => {
            const result = Object.entries(_.groupBy(res.data, (item) => item.category.title));
            setNewsData(result);
        })
    },[])
  return (
      <div style={{width:"95%" , margin:"0 auto"}}>
          <PageHeader title="全球大新闻" subTitle="查看新闻" onBack={() => props.history.push('/login')} />
          <Row gutter={16}>
              {
                  newsData.map(item => {
                      return (
                          <Col span={8} key={item.title}>
                              <Card title={item[0]} bordered={false}>
                                  <List
                                      dataSource={item[1]}
                                      pagination={{ pageSize: 3 }}
                                      rowKey={item[0]}
                                      renderItem={(data) => (
                                          <List.Item>
                                              <a href= {`#/detail/${data.id}`}> {data.title}</a>
                                          </List.Item>
                                      )}
                                  />
                              </Card>
                          </Col>
                      )
                  })
             }
          </Row>
    </div>
  )
}
export default withRouter(VisitHome);
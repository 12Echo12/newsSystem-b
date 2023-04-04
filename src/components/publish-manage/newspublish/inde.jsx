import React from 'react'
import {Table , Tag} from 'antd';
import { withRouter } from 'react-router-dom';

function NewsPublish(props) {
  // 表的配置
  const columns = [
    {
      title: "新闻标题",
      dataIndex: 'title',
      render: (title, item) => {
        return <a onClick={() => { props.history.push(`/news-manage/preview/${item.id}`) }}>{title}</a>
      }
    },
    {
      title: "作者",
      dataIndex: 'author',
    },
    {
      title: "新闻分类",
      dataIndex: 'category',
      render: (category) => <Tag color={"gold"}>{category.title}</Tag>,
    },
    {
      title: "操作",
      render: (item) => { return props.button(item.id)}
    }
  ];
  return (
    <Table columns={columns} dataSource={props.dataSource} pagination={{ pageSize: 5 }} rowKey={(record)=>record.id} />
  )
}
export default withRouter(NewsPublish);
import React, { useEffect ,useRef,useState} from 'react'
import { Card, Col, Row, Avatar, List, Drawer, Image } from 'antd';
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined
} from '@ant-design/icons';
import axios from 'axios';
import * as echarts from 'echarts';
import _ from 'lodash'
import './index.css'
import img from './husband.jpg'


const { Meta } = Card;

export default function Home() {
  const [viewList, setViewList] = useState([]);
  const [starList, setStarList] = useState([]);
  const barRef = useRef();
  const pieRef = useRef();
  const [drawOpen, setDrawOpen] = useState(false);
  const [myPieData, setMyPieData] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:8000/news?publishState=2&_expand=category&_sort=view&_order=desc`).then(res => {
      setViewList(res.data);
    })
  }, [])
  useEffect(() => {
    axios.get(`http://localhost:8000/news?publishState=2&_expand=category&_sort=start&_order=desc`).then(res => {
      setStarList(res.data);
    })
  }, [])
  useEffect(() => {
    var categoryData;
    axios.get(`http://localhost:8000/news?publishState=2&_expand=category`).then(res => {
      categoryData = _.groupBy(res.data, (item) => item.category.title);
      handleBarShow(categoryData);
    })
    return () => {
      window.onresize = null;
    }
  }, [])
  useEffect(() => {
    if(pieRef.current)
      handlePieShow();
  }, [pieRef.current])
  useEffect(() => {
    var myData;
    axios.get(`http://localhost:8000/news?author=${user.username}&publishState=2&_expand=category`).then(res => {
      myData = _.groupBy(res.data, (item) => item.category.title);
      var list = [];
      for (const i in myData) {
        list.push({
          value: myData[i].length,
          name: i
        })
      }
      setMyPieData(list);
    })
  },[])
  const handleBarShow=(data) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(barRef.current);

    // 指定图表的配置项和数据
    var option = {
      title: {
        text: '新闻分类图示'
      },
      tooltip: {},
      legend: {
        data: ['数量']
      },
      xAxis: {
        data: Object.keys(data),
        // 放置如果缩小页面导致横坐标数据显示不全
        axisLabel: {
          rotate: "45",
          interval:0
        }
      },
      yAxis: {},
      series: [
        {
          name: '数量',
          type: 'bar',
          data: Object.values(data).map(i=>i.length)
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //页面缩放时，柱状图也跟着进行缩放！！！
    window.onresize = () => {
      myChart.resize();
    }
  }
  const handlePieShow = (data) => {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(pieRef.current);

    // 指定图表的配置项和数据
    var option = {
      series: [
        {
          type: 'pie',
          data: myPieData
        }
      ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);

    //页面缩放时，柱状图也跟着进行缩放！！！
    window.onresize = () => {
      myChart.resize();
    }
  }
  const viewData = viewList.map(i => {
    return (
      <a href={`http://localhost:4343/#/news-manage/preview/${i.id}`}>{i.title}</a>
    )
  })
  const starData = starList.map(i => {
    return (
      <a href={`http://localhost:4343/#/news-manage/preview/${i.id}`}>{i.title}</a>
    )
  })
  const user = JSON.parse(localStorage.getItem("token"));
  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="用户最常浏览" bordered={false}>
            <List
              size="small"
              // bordered
              dataSource={viewData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="用户点赞最多" bordered={false}>
            <List
              size="small"
              // bordered
              dataSource={starData}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            cover={
              <Image
                width={200}
                height={220}
                src={img}
              />
            }
            actions={[
              <SettingOutlined key="setting" onClick={function () {
                // drawOpenRef.current = true;
                setDrawOpen(true);
              }} />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              avatar={<Avatar src="https://joesch.moe/api/v1/random" />}
              title={user.username}
              description={<div><span style={{ color: "gray", fontWeight: "800" }}>{user.role.roleName}</span><span style={{ marginLeft: "10px" }}>{user.region === "" ? "全球" : user.region}</span></div>}
            />
          </Card>
        </Col>
      </Row>
      <div ref={barRef} className="echarts"></div>
      <Drawer width="600px" style={{ height: "100%"}} title="个人新闻分类" placement="right" onClose={() => setDrawOpen(false)} open={drawOpen} id="drawer">
        <div ref={pieRef} style={{height:"400px" }}></div>
      </Drawer>
   </div>
  )
}

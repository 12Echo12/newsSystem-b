import React, { useEffect, useRef, useState } from 'react'
import { Button, Descriptions } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import {
    LikeOutlined,
    LikeFilled
} from '@ant-design/icons';

function VisitDetail(props) {
    const currentId = props.match.params.id;
    const [content, setContent] = useState({});
    const [isLike, setIsLike] = useState(false);
    const viewRef = useRef();
    const starRef = useRef();
    useEffect(() => {
        axios.get(`http://localhost:8000/news?id=${currentId}&_expand=category&_expand=role`).then((res) => {
            setContent({ ...res.data[0], view: res.data[0].view + 1 });
            viewRef.current = res.data[0].view + 1;
            starRef.current = res.data[0].star;
        }).then(res => {
            axios.patch(`http://localhost:8000/news/${currentId}`, {
                view: viewRef.current
            })
        })
    }, [])
    const handleLike = () => {
        if (isLike) {
            setContent({ ...content, star: content.star - 1 });
            axios.patch(`http://localhost:8000/news/${currentId}`, {
                star: starRef.current-1
            })
        } else {
            setContent({ ...content, star: content.star + 1 });
            axios.patch(`http://localhost:8000/news/${currentId}`, {
                star: starRef.current + 1
            })
        }
        setIsLike(!isLike);
   }
    return (
        <div>
            {
                content &&
                <div>
                        <div style={{ position: "absolute", top: "57px", left: "250px", color: "red" }} onClick={() => handleLike()} >{isLike ? <LikeFilled /> : <LikeOutlined />}</div>  
                    <PageHeader title="返回" onBack={() => props.history.goBack()}/> 
                    <Descriptions onBack={() => props.history.goBack()} title={content.title} style={{ margin: "0 24px" }}>
                        <Descriptions.Item label="创建者">{content.author}</Descriptions.Item>
                        <Descriptions.Item label="发布时间">o</Descriptions.Item>
                        <Descriptions.Item label="区域">{content.region}</Descriptions.Item>
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
export default withRouter(VisitDetail)
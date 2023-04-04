import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../../components/publish-manage/newspublish/inde'
import usePublish from '../../../../hooks/usePublish';
import { Button } from 'antd';

export default function NewsSunset() {
  const { handleDelete, dataSource } = usePublish(3);
  return (
    <div>
      <NewsPublish dataSource={dataSource} button={(operateId) => {
        return (<Button type='primary' danger onClick={()=>handleDelete(operateId)}>删除</Button>)
      }}>
      </NewsPublish>
    </div>
  )
}

import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../../components/publish-manage/newspublish/inde'
import usePublish from '../../../../hooks/usePublish';
import { Button } from 'antd';

export default function NewsUnpublished() {
  const { handlePublish, dataSource } = usePublish(1);
  return(
     <div>
      <NewsPublish dataSource={dataSource} button={(operateId) => {
        return (<Button type='primary' onClick={()=>handlePublish(operateId)}>发布</Button>)
      }}>
      </NewsPublish>
    </div>
  )
}
import { Button } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import NewsPublish from '../../../../components/publish-manage/newspublish/inde'
import usePublish from '../../../../hooks/usePublish';

export default function NewsPublished() {
  const { handleSunset, dataSource} = usePublish(2);
  return ( 
    <div>
      <NewsPublish dataSource={dataSource} button = {(operateId) => {
        return (<Button type='primary' onClick={()=> handleSunset(operateId)}>下线</Button>)
      }}>
      </NewsPublish>
    </div>
  )
}

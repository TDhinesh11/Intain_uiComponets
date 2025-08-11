import React from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import './Loader.css';

export default (props) => {
  return (
    <div className='loader-wrapper' style={props.style}>
      <div className='inside_loader'>
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: '#004d40' }} spin />} />
        <p style={{color: 'var(--text-color)'}}>{props.msg ? props.msg : 'Loading...'}</p>
      </div>
    </div>
  )
};

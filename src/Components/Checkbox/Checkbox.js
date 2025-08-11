import React from 'react';
import { Checkbox as AntCheckbox } from 'antd';
import './Checkbox.css';

const Checkbox = ({onChange, checked, onClick, disabled}) => {
  return (
    <AntCheckbox onChange={onChange} checked={checked} onClick={onClick} disabled={disabled} />
  )
}

export default Checkbox;

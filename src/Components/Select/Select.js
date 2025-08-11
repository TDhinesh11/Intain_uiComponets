import React from 'react';
import { Select as AntSelect } from 'antd';
import './Select.css';
import DropdownIcon from '../../Images/Dropdown.svg';

const Select = ({
  options, 
  onChange, 
  value, 
  required, 
  disabled, 
  error, 
  ref, 
  disabledValue, 
  placeholder, 
  width,
  showSearch=false,
  borderless=false
}) => {
  console.log(options,'optionsselect')
  return (
    <AntSelect 
    className={borderless ? 'borderless' : ''}
    showSearch={showSearch}
    style={{width: width}}
    options={options}
    placeholder={placeholder}
    onChange={onChange}
    value={value}
    required={required}
    disabled={disabled}
    status={error ? 'error' : ''}
    disabledValue={disabledValue}
    suffixIcon={<img src={DropdownIcon} alt="dropdown" />}
    />
  );
};

export default Select;

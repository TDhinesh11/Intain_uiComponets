import React from 'react';
import './Textarea.css';

const Textarea = ({value, onChange, name, onBlur}) => {
  return (
    <textarea className='compTextarea' value={value} onChange={onChange} name={name} style={{ resize: 'vertical' }} onBlur={onBlur}/>
  )
}

export default Textarea;

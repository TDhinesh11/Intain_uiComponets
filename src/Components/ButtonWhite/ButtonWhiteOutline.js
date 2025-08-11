import React from 'react';
import './ButtonWhite.css';

const ButtonWhiteOutline = (props) => {
  return (
    <div className='button_white' style={{
      ...props?.style,
      width: props?.btnWidth,
      border: props?.disabled ? '1.2px solid #999999' : undefined
    }}>
      <button 
        disabled={props?.disabled} 
        style={{cursor: props?.pointer}} 
        onClick={props.onClick} 
        className={`white_button_main ${props.isSelected ? 'highlight' : ''}`}
      >
        {props.name}
      </button>
    </div>
  )
}

export default ButtonWhiteOutline;

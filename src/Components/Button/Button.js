import React from 'react';
import './Button.css';

const Button = (props) => {
  console.log(props,'props')
  return (
    <div className='button' style={{
      width: props?.btnWidth,
      marginBottom: props?.marginBottom || '0'
    }}>
      <button disabled={props?.disabled || props?.isLoading} onClick={props.onClick} className={props.loader ? 'loader button_main' : 'button_main'}>
        {props.loader ? 
        'Signing in...'
        : props.name}
        </button>
    </div>
  )
}

export default Button;

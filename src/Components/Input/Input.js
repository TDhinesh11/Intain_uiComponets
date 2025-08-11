import React, { forwardRef } from 'react';
import './Input.css';
import { Input as AntInput } from 'antd';
import VisibilityOutlinedIcon from '../../Images/Eye.png';
import VisibilityOffOutlinedIcon from '../../Images/Eye_off.png';


const Input = forwardRef(({type, placeholder, onChange, value, required, disabled, error, onBlur, name, showPassword, togglePasswordVisibility}, ref) => {
  console.log(error,'customInput')
  return (
    <div className='password-input-container'>
      {type === 'password' ? (
        <AntInput.Password
        ref={ref}
        name={name}
        className={error ? 'compInput error' : disabled ? 'compInput disabled' : 'compInput'}
        autoComplete='off'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
        iconRender={(visible) => (
          <img 
            src={visible ? VisibilityOutlinedIcon : VisibilityOffOutlinedIcon} 
            alt={visible ? "Hide password" : "Show password"}
            style={{ width: '16px', height: '16px', cursor: 'pointer' }}
          />
        )}
      />
      ) : (
        <AntInput
        ref={ref}
        name={name}
        className={error ? 'compInput error' : disabled ? 'compInput disabled' : 'compInput'}
        autoComplete='off'
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        required={required}
        disabled={disabled}
        onBlur={onBlur}
      />
      )}
    </div>
  )
});

export default Input;

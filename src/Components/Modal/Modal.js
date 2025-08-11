import React from 'react';
import { Modal as AntModal } from 'antd';
import './Modal.css';
import Close from '../../Images/Close.svg';
import CloseDark from '../../Images/Close_Dark.svg';
import ButtonWhite from '../ButtonWhite/ButtonWhite';
import Button from '../Button/Button';

const Modal = ({
  open, 
  onCancel, 
  footer=true, 
  title, 
  children, 
  closeIcon=true, 
  width, 
  centered=true, 
  position, 
  buttonWhiteName, 
  buttonName, 
  onButtonClick, 
  disabled,
  deleteModal=false
}) => {
    const isDarkMode = sessionStorage.getItem("theme") === "dark";

  return (
    <div>
      <AntModal 
        className={deleteModal ? 'delete-modal' : ''}
        title={title} 
        centered={centered}
        style={{ ...position, fontFamily: 'Mulish'}}
        width={width ? width : '50%'}
        open={open} 
        onCancel={onCancel} 
        footer= {
            footer 
            ? 
            [
            <ButtonWhite  name={buttonWhiteName} width='fit-content' onClick={() => onCancel()}/>,
            <Button name={buttonName} btnWidth={!deleteModal &&'fit-content'} onClick={() => onButtonClick()} disabled={disabled}/>
            ]
            : null
        } 
        closeIcon={closeIcon ? <img src={isDarkMode ? CloseDark : Close} alt="close" /> : closeIcon}>
        {children}
      </AntModal>
    </div>
  )
}

export default Modal;

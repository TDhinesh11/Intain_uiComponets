import React from 'react';
import './ToolTip.css';
import { Tooltip as AntTooltip } from 'antd';

const ToolTip = ({title, children, placement='bottom', color, arrow}) => {
  return (
    <AntTooltip 
        title={title}
        placement={placement}
        arrow={true}
        className="custom-tooltip"
    >
      {children}
    </AntTooltip>
  )
}

export default ToolTip;

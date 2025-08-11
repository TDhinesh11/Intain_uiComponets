import React, { useState } from 'react';
import './ThemeSwitch.css';
import IconLight from '../../Images/Sun.svg';
import IconDark from '../../Images/Moon.svg';

const ThemeSwitch = ({isOn, toggleTheme}) => {

  return (
    <div className={`toggle-switch ${isOn ? 'on' : 'off'}`} onClick={() => toggleTheme()}>
      <div className={`switch-knob ${isOn ? 'on' : 'off'}`}>
      <img
          src={isOn ? IconDark : IconLight}
          alt={isOn ? 'Dark Mode' : 'Light Mode'}
          className="icon"
        />
      </div>
    </div>
  );
};

export default ThemeSwitch;

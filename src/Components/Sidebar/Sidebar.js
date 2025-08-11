import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { Popover } from 'antd';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import Intain from '../../Images/Intain_Brain.svg';
import IntainLogo from '../../Images/IntainLogo.png';
import IntainLogo1 from '../../Images/poweredby.png';
import Info from '../../Images/info.svg';
import InfoDark from '../../Images/info_dark.svg';
import Notification from '../../Images/notification.webp';
import NotificationDark from '../../Images/notification_dark.webp';

const Sidebar = ({list, user_name, logout, poweredBy, helpFn, logo, hiddenLogo}) => {
    // Safe way to use useLocation - check if we're in a router context
    console.log(list);
    let location, pathname, splitLocation;
    try {
        location = useLocation();
        pathname = location.pathname;
        splitLocation = pathname.split('/');
    } catch (error) {
        // If not in router context, provide defaults
        pathname = '/';
        splitLocation = [''];
    }

    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [showUserInfoModal, setShowUserInfoModal] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(
      sessionStorage.getItem("theme") === "dark"
    );
    const [isOn, setIsOn] = useState(sessionStorage.getItem("theme") === "dark");
  
    const toggleTheme = () => {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);
      setIsOn(newDarkMode);
      const theme = newDarkMode ? "dark" : "light";
      document.documentElement.setAttribute("dark-theme", theme); 
      sessionStorage.setItem("theme", theme); 
    };
    console.log(isDarkMode,'isDarkMode');

    //const user_name = 'dineshpandi714@gmail.com' sessionStorage.getItem(name);

    useEffect(() => {
        if(isDarkMode){
            document.documentElement.setAttribute("dark-theme", "dark");
        } else {
            document.documentElement.setAttribute("dark-theme", "light");
        }
    }, []);

    useEffect(() => {
        const blurContainer =
          document.querySelector("#root");
        if (showUserInfoModal) {
          blurContainer.classList.add("blur-background");
        } else {
          blurContainer.classList.remove("blur-background");
        }
        return () => blurContainer.classList.remove("blur-background");
      }, [showUserInfoModal]);

    const handleShowUserInfoModal = () => {
        setShowUserInfoModal(true);
    };
    const handleCloseUserInfoModal = () => {
        setShowUserInfoModal(false);
    };
    const profileContent = (
        <>
          <div className='d-flex gap-3 mb-2 align-items-center '>
            <div className='dialogLogo'>
              {user_name[0].toUpperCase()}
            </div>
            <div className='d-flex flex-column gap-1 dialogProfileName'>
            {user_name.split('@')[0]}
              <div className='dialogProfileNameP'>
                <p>View Profile</p>
              </div>
            </div>
          </div>
          <div className='dialogProfileEmail'>
            {user_name}
          </div>
          <hr
             style={{
              height: '1px',
              width: '100%',
              color: 'black',
              margin: '2px',
              padding: 0,
              }}
          />
          <div className='theme-switch-container'>
            <label>Light</label>
                <ThemeSwitch isOn={isOn} toggleTheme={() => toggleTheme()}/>
            <label>Dark</label>
          </div>
          <hr
             style={{
              height: '1px',
              width: '100%',
              color: 'black',
              margin: 0,
              padding: 0,
              }}
          />
          <p className='logout_nav' onClick={() => logout()}>Logout</p>
        </>
    );

    // For the Link components, you might want to conditionally render them
    const renderNavigationLink = (item, index) => {
        const isActive = item.locations.includes(splitLocation[1]);
        const className = isActive ? 'issure-icon-active' : 'issure-icon';
        
        // If we have router context, use Link, otherwise use a div or button
        if (location) {
            return (
                <Link to={item.to} title={item.name} className={className} onClick={() => item.onClick()}>
                    <img src={isDarkMode ? item.icon[1] : item.icon[0]} alt={item.name}/>
                    <span className='sidebar-text content-show'>{item.name}</span>
                </Link>
            );
        } else {
            return (
                <div title={item.name} className={className} onClick={() => console.log(`Navigate to ${item.to}`)}>
                    <img src={item.icon} alt={item.name}/>
                    <span className='sidebar-text content-show'>{item.name}</span>
                </div>
            );
        }
    };

  return (
    <div className={`sidebar ${isPopoverOpen ? 'hovered' : ''}`}>
        <div className='sidebar-icons'>
            <div className='sidebar-logo'>
                <img src={logo ? logo : Intain} alt='Intain AI' className='logo-intain'/>
                <img src={hiddenLogo ? hiddenLogo : IntainLogo} alt='Intain Logo' className='logo-intain-hidden'/>
            </div>
            <ul>
                {list.map((item, index) => (
                    <li className='issure-icons' key={index}>
                        {renderNavigationLink(item, index)}
                    </li>
                ))}
            </ul>
        </div>
        <div className='sidebar-footer'>
            <ul>
                <li className='sidebar-item'>
                    <div className='sidebar-item-content' onClick={() => helpFn()}>
                        <img src={isDarkMode ? InfoDark : Info} alt='Help'/>
                        <span className="sidebar-text content-show">Help</span>
                    </div>
                </li>
                <li className='sidebar-item'>
                    <div className='sidebar-item-content'>
                        <img src={isDarkMode ? NotificationDark : Notification} alt='Notification'/>
                        <span className="sidebar-text content-show">Notification</span>
                    </div>
                </li>
                <li className='sidebar-item'>
                    <Popover
                        placement="rightBottom" 
                        content={profileContent} 
                        trigger="click" 
                        classNames={{wrapper: "custom-popover-profile"}}
                        open={isPopoverOpen}
                        onOpenChange={(visible) => {
                        setIsPopoverOpen(visible);
                        if(visible){
                            handleShowUserInfoModal();
                        } else {
                            handleCloseUserInfoModal();
                        }
                        }}>
                        <div className='sidebar-item-content'>
                            <div className='sidebar-item-profile'>
                                <p>{user_name[0].toUpperCase()}</p>
                            </div>
                            <div>
                                <span className="sidebar-text content-show">
                                Profile & More {'>'}
                                </span>
                            </div>
                        </div>
                    </Popover>
                </li>
                {poweredBy && (
                    <div className='powered-by-container'>
                        <hr className='powered-by-hr'/>
                        <div className='powerBy-sidebar-logo'>
                            <img src={Intain} alt='Intain AI' className='logo-intain'/>
                            <span className='powerBy-logo'>
                                <p>Powered by</p>
                                <img style={{width: '64px', height: '32px'}} src={IntainLogo1} alt='Intain Logo'/>
                            </span>
                        </div>
                    </div>
                )}
            </ul>
        </div>
    </div>
  )
}

export default Sidebar;

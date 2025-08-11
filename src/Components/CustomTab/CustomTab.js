
import React from 'react';
import { Tabs, Paper } from '@mui/material';
import './CustomTab.css';

const CustomTab = ({value, handleChange, TabButton, ariaLabel, Tab, variant, scrollButtons, className, width}) => {
  console.log(TabButton,'checckintab');
  return (
    <Paper
        elevation={0}
        sx={{
        position: "relative",
        backgroundColor: "var(--background-color)",
        width: width && width,
        }}
    >
        <Tabs
            value={value}
            onChange={handleChange}
            aria-label={ariaLabel}
            variant={variant}
            scrollButtons={scrollButtons}
            className={className}
            slotProps={{
            indicator: {
                sx: {
                width: `${TabButton[value]?.length * 7 || 40}px !important`,
                height: "2px",
                borderRadius: "10px",
                backgroundColor: "var(--dialog-profile)",
                transition: "left 0.3s",
                bottom: "2px",
                },
            },
            }}
            sx={{
            "& .MuiTab-root:not(:last-child)": {
                paddingLeft: 0,
                marginRight: "23px",
            },
            "& .MuiTab-root": {
                minWidth: "fit-content",
            }
            }}
        >
            {Tab}
        </Tabs>
    </Paper>
  )
}

export default CustomTab;

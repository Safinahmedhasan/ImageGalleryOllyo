import React from 'react';
import './ThemeSwitcher.css';

const ThemeSwitcher = ({ handleThemeChange, isDarkMode }) => {
    return (
        <button className={`theme-switcher ${isDarkMode ? 'dark' : 'light'}`} onClick={handleThemeChange}>
            
        </button>
    );
};

export default ThemeSwitcher;

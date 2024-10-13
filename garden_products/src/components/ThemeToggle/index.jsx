import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../actions/themeActions";
import imageLight from '../../assets/images/mode=light.svg'; //Импорт картинок.
import imageDark from '../../assets/images/mode=dark.svg';

import s from '../ThemeToggle/index.module.css';


function ThemeToggle() {

    const dispatch = useDispatch();     //Создание Диспетчера (Lev)
    const theme = useSelector((state) => state.theme.mode);

    const handleToggle = () => {
        dispatch(toggleTheme());
    };

    return (
            <button onClick={handleToggle} className={s.button}>
                <img src= {theme === 'light' ? imageLight : imageDark}/>  
            </button>
    );

}

export default ThemeToggle;
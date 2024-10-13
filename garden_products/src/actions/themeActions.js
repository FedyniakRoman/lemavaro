// src/actions/themeActions.js
export const toggleTheme = () => {
    return {
      type: 'TOGGLE_THEME',
    };
  };
  
  export const setTheme = (theme) => {
    return {
      type: 'SET_THEME',
      payload: theme,
    };
  };
  
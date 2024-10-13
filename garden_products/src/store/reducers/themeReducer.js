// src/reducers/themeReducer.js
// Редьюсер для Темы Приложения
const initialState = {
    mode: localStorage.getItem('theme') || 'light' // По умолчанию светлая тема
  };
  
  const themeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'TOGGLE_THEME':
        const newTheme = state.mode === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme); // Сохраняем тему в localStorage
        return {
          ...state,
          mode: newTheme,
        };
      case 'SET_THEME':
        localStorage.setItem('theme', action.payload);
        return {
          ...state,
          mode: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default themeReducer;
  
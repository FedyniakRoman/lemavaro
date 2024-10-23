// import { createContext } from 'react';
// import backendUrl from '../config'; //Переменная для удобного переключения между локальным и удаленным бэкендом.

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const addNewOrder = (newOrder) => {
//     fetch(`${backendUrl}/order/send`, {         //Запрос
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json;charset=utf-8',
//       },
//       body: JSON.stringify(newOrder),
//     })
//     .then(res => res.json())
//     .then(json => console.log(json));
//   };

//   return (
//     <ContextProvider value={{ addNewOrder }}>
//       {children}
//     </ContextProvider>
//   );
// };

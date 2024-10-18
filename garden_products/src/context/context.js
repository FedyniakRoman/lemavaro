// import { createContext } from 'react';

// export const Context = createContext();

// export const ContextProvider = ({ children }) => {
//   const addNewOrder = (newOrder) => {
//     fetch('http://localhost:3333/order/send', {
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

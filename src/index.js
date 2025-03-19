// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { configureStore } from "@reduxjs/toolkit"; // Correct path

// // import rootReducer from "./slices"
// import { Provider } from 'react-redux';

// // export const store = configureStore({ reducer: rootReducer, devTools: true})

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   // <Provider store={store}>
//   <React.Fragment>
//     <BrowserRouter>
//     <App />
//     </BrowserRouter>
//     </React.Fragment>
//     // </Provider>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slices";

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
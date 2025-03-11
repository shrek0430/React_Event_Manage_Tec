import React from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import './assets/scss/themes.scss';

function App() {
  return (
    <BrowserRouter>
    
        <Login />
      
    </BrowserRouter>
  );
}




export default App;


import React from "react";
import Route from "./Routes"
import './assets/scss/themes.scss';
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
// import {store} from './index'
// function App() {
//   return (
//     <>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/forgot-password" element={<ForgetPasswordPage />} />
//           <Route path="/dashboard" element={<Dashboard/>}></Route>
//           <Route path="*" element={<Navigate to="/" />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

function App() {
  return (
    <React.Fragment>
    <ToastContainer position="top-right" autoClose={3000} />
      <Route />
    </React.Fragment>
  );
}

export default App;

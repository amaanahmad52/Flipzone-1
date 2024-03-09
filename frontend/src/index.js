import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import store from "./store"
import { Provider } from 'react-redux';
import{positions,transitions,Provider as AlertProvider} from "react-alert"
import AlertTemplate from "react-alert-template-basic"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const options = {  //basically ek alert aayega, ye uski styling hai
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
  
};


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>

    <ToastContainer
      position="bottom-center"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
  </Provider>
);

// this is the entry point of application

// the entry point refers to the specific location in the code where the execution of the application begins
// here react app gets bootstrapped
// bootstrapping refers to the process of initializing and setting up the fundamental components and dependencies required for an application to run. 
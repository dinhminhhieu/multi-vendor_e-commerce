import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Toaster} from "react-hot-toast"
import {Provider} from 'react-redux'
import store from "./store/index";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
    <Toaster
      toastOptions={{
        position: "top-right",
        error: {
          duration: 5000,
          iconTheme: {
            primary: "#990000",
          },
          style: {
            background: "#ff3333",
            color: "white",
          },
        },
        success: {
          duration: 5000,
          iconTheme: {
            primary: "#00e64d",
          },
          style: {
            background: "#009933",
            color: "white",
          },
        },
      }}
    />
  </Provider>
);

reportWebVitals();

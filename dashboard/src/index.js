import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";
import store from "./store/index";
import { Provider } from "react-redux";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
const App = lazy(() => import("./App"));

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense fallback="loading...">
        <App />
        <Toaster
          toastOptions={{
            position: "top-right",
            error: {
              duration: 3000,
              iconTheme: {
                primary: "#990000",
              },
              style: {
                background: "#ff3333",
                color: "white",
              },
            },
            success: {
              duration: 3000,
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
      </Suspense>
    </Provider>
  </BrowserRouter>
);

reportWebVitals();

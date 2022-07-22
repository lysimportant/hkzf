import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./store";
import App from "./App";
import "./assets/css/index.css";
// import "react-virtualized/styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Suspense>
  </Provider>
);

import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Auth from "./components/AuthComponents/Auth";
import SignIn from "./components/AuthComponents/SignIn";
import Home from "./components/Home/Home";
import store from "./store";
import { Provider } from "react-redux";
import SignUp from "./components/AuthComponents/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Auth />}>
        <Route index={true} path="/" element={<Home />} />
      </Route>
      <Route path="/auth" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

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
import ProfilePage from "./components/Profile/ProfilePage";
import UserDetailsPage from "./components/Profile/ProfileComponents/UserDetailsPage";
import UserPasswordChange from "./components/Profile/ProfileComponents/UserPasswordChange";
import AddShirt from "./components/Profile/ProfileComponents/AddShirt";
import AddPant from "./components/Profile/ProfileComponents/AddPant";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<Auth />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path='/profile' element={<ProfilePage />} >
          <Route index={true} element={<UserDetailsPage />} />
          <Route path="/profile/password" element={<UserPasswordChange />} />
          <Route path="/profile/shirt" element={<AddShirt />} />
          <Route path="/profile/pant" element={<AddPant />} />
        </Route>
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

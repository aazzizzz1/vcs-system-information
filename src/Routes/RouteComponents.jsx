import Cookies from "js-cookie";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../Pages/Auth/SignIn"
import SignUp from "../Pages/Auth/SignUp"
import { GlobalProvider } from "../StateManagements/GlobalContext";
import Sidebar from "../Layouts/Sidebar/Sidebar";
import Table from "../Pages/Dashboard/Table";
import Home from "../Pages/Dashboard/Home"
import Default from "../Components/Default/Default";
import Sidebar2 from "../Components/Sidebar/Sidebar2";

const SignInRoute = (props) =>{
    if (Cookies.get('token') !== undefined) {
     return <Navigate to={'/'} />
    } else if ( Cookies.get('token') === undefined){
     return props.children
    }
   }
  
   const HomeRoute = (props) =>{
    if (Cookies.get('token') !== undefined) {
      return props.children
    } else if ( Cookies.get('token') === undefined){
      return <Navigate to={'/signin'} />
    }
   }

const RouteComponents = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalProvider>
        <Routes>
          <Route
            path="/"
            element={
              <HomeRoute>
                <Sidebar>
                  <Table/>
                </Sidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/home"
            element={
              <HomeRoute>
                <Sidebar>
                  <Home/>
                </Sidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/default"
            element={
              <HomeRoute>
                <Sidebar>
                  <Default/>
                </Sidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <SignInRoute>
                <SignIn />
              </SignInRoute>
            }
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/coba" element={<Sidebar2/>} />
        </Routes>
      </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default RouteComponents;

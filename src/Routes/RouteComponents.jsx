import Cookies from "js-cookie";
import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SignIn from "../Pages/Auth/SignIn"
import SignUp from "../Pages/Auth/SignUp"
import { GlobalProvider } from "../StateManagements/GlobalContext";
import Table from "../Pages/Dashboard/Table";
import Home from "../Pages/Dashboard/Home"
import Default from "../Components/Default/Default";
import LayoutSidebar from "../Layouts/Sidebar/LayoutSidebar";
import TableProductManager from "../Pages/Dashboard/TableProductManager";

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
                <LayoutSidebar>
                  <Table/>
                </LayoutSidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/home"
            element={
              <HomeRoute>
                <LayoutSidebar>
                  <Home/>
                </LayoutSidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/table-2"
            element={
              <HomeRoute>
                <LayoutSidebar>
                  <TableProductManager/>
                </LayoutSidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/default"
            element={
              <HomeRoute>
                <LayoutSidebar>
                  <Default/>
                </LayoutSidebar>
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
          <Route path="/coba" element={<LayoutSidebar/>} />
        </Routes>
      </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default RouteComponents;

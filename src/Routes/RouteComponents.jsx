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
import FinalProject from "../Pages/Tugas/FinalProject";
import KanbanTable from "../Pages/Tugas/Kanban/KanbanTable";
import CobaPagination from "../Pages/Coba/Pagination/CobaPagination";
import ErrorPage from "../Components/Default/ErrorPage";

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
            path="/final-project"
            element={
              <HomeRoute>
                <LayoutSidebar>
                  <FinalProject/>
                </LayoutSidebar>
              </HomeRoute>
            }
          />
          <Route
            path="/kanban"
            element={
              <HomeRoute>
                <LayoutSidebar>
                  <KanbanTable/>
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
          <Route
            path="/signup"
            element={
              <SignInRoute>
                <SignUp />
              </SignInRoute>
            }
          />
          <Route path="/coba" element={<CobaPagination/>} />
          <Route
              path="/*"
              element={
                <ErrorPage/>
              }
            />
        </Routes>
      </GlobalProvider>
      </BrowserRouter>
    </>
  );
};

export default RouteComponents;

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Page404 from './views/Page404';
import Login from './views/Login';
import Sidebar from './components/Sidebar';
import Home from './views/Home';
import React from "react";

const isAuthenticated = (props) => {
  if (sessionStorage.getItem('agToken')) return true;
  else return false;
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isAuthenticated(props) ? (
        <Component {...props} />
      ) : (
        <Navigate to={{ pathname: "/login", state: { from: props.location } }} replace={true} />
      )
    }
  />
);

const UniRoutes = () => (
  <React.Fragment>
    <BrowserRouter basename="/library">
      <Routes>
        <Route exact={true} path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
    <BrowserRouter basename="/library/page">
      <Sidebar>
        <Routes>          
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  </React.Fragment>
);

export default UniRoutes;
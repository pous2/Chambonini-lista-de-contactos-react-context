import React from "react";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <nav className="navbar navbar-light bg-light px-3">
        <span className="navbar-brand mb-0 h1">Contact List</span>
      </nav>
      
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};
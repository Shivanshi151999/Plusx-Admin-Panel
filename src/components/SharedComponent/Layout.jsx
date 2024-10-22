import React from "react";
import { Outlet } from "react-router-dom";
import SideNavbar from "./SideNavBar/SideNavbar";
import Header from './Header/Header'
function Layout() {
  return (
    <>
    <div className="d-flex">
      <div>
        <SideNavbar />
      </div>
      <div className="d-flex flex-column w-100">
        <div><Header/></div>
       <div><Outlet /></div> 
       </div>
    </div>
    </>
  );
}

export default Layout;
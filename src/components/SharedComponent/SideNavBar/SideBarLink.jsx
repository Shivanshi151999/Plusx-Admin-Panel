import React from "react";
import { NavLink } from "react-router-dom";

import style from "./sidenavbar.module.css";

function SideBarLinkItem({ path, label }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? `${style.menuItem} ${style.active}` : style.menuItem
      }
    >
      <li>{label}</li>
    </NavLink>
  );
}

export default SideBarLinkItem;

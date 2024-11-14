import React from "react";
import { NavLink } from "react-router-dom";
import style from "../sidenavbar.module.css";

function SidebarDropdownItem({ item, checkedItems, handleItemClick }) {
  return (
    <li
      key={item.id}
      className={`${
        checkedItems[item.id] ? style.activeItem : style.inactiveItem
      }`}
      onClick={(e) => handleItemClick(item.id, e)}
    >
      <input
        className={style.checkboxInput}
        type="checkbox"
        id={item.id}
        checked={checkedItems[item.id]}
        onChange={(e) => handleItemClick(item.id, e)}
      />
      <label htmlFor={item.id} className={style.checkmark}></label>
      <NavLink
        to={item.path}
        className={({ isActive }) => (isActive ? style.activeText : "")}
      >
        {item.label}
      </NavLink>
    </li>
  );
}

export default SidebarDropdownItem;

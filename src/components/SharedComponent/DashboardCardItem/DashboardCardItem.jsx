import React from "react";
import { NavLink } from "react-router-dom";
import style from "./DashboardCardItem.module.css";

const DashboardCardItem = ({ title, icon, count, route, isActive, onClick }) => {
  return (
    <NavLink to={route}
      className={`${style.card} ${isActive ? style.cardActive : ""}`}
      onClick={onClick}
    >
      <div className={style.cardWrapper}>
        <div className={style.cardIcon}>{icon}</div>
        <div className={style.cardCount}>{count}</div>
      </div>
      <div className={style.cardTitle}>{title}</div>
    </NavLink>
  );
};

export default DashboardCardItem;

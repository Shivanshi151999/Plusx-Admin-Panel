import React from "react";
import style from "./DashboardCardItem.module.css";

const DashboardCardItem = ({ title, icon, count, isActive, onClick }) => {
  return (
    <div
      className={`${style.card} ${isActive ? style.cardActive : ""}`}
      onClick={onClick}
    >
      <div className={style.cardWrapper}>
        <div className={style.cardIcon}>{icon}</div>
        <div className={style.cardCount}>{count}</div>
      </div>
      <div className={style.cardTitle}>{title}</div>
    </div>
  );
};

export default DashboardCardItem;

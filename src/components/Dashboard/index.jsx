import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Graph from "./Graph/Graph";
import DashboardCardItem from "./DashboardCard/DashboardCard";

import style from "./index.module.css";

function Index() {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!userDetails || !userDetails.access_token) {
      navigate("/login");
      return;
    }
  }, []);

  return (
    <div className={style.dashboard}>
      <Graph />
      <DashboardCardItem />
    </div>
  );
}

export default Index;

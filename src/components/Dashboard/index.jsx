import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import style from "./index.module.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import Graph from "./Graph/Graph";
import DashboardCardItem from "./DashboardCard/DashboardCard";
import MapComponent from "./Map/Map";
import { fetchDashboardDetails } from "../../store/dashboardSlice";
import Loader from "../SharedComponent/Loader/Loader";

function Index() {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { details, status, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    if (!userDetails || !userDetails.access_token) {
      navigate("/login");
      return;
    }
    if (status === "idle") {
      dispatch(fetchDashboardDetails());
    }
  }, [dispatch, status, userDetails, navigate]);

  useEffect(() => {
    if (error) {
      toast(error, { type: "error" });
    }
  }, [error]);

  const isLoading = status === "loading";

  return (
    <div className="main-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={`row ${style.row}`}>
            <div className={`col-xl-12 col-lg-12`}>
              <MapComponent />
            </div>
            {/* <div className={`col-xl-6 col-lg-12`}>
              <Graph />
            </div>
            <div className={`col-xl-6 col-lg-12`}>
              <MapComponent />
            </div> */}
          </div>
          <DashboardCardItem details={details} />
        </>
      )}
    </div>
  );
}

export default Index;

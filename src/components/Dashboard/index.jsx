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
import NewMapComponet from './Map/NewMap'

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

  // API call every 5 minute
  useEffect(() => {
    if (!userDetails || !userDetails.access_token) {
      navigate("/login"); 
      return; 
    }
    // Set interval to fetch details every 5 minute
    const intervalCall = setInterval(() => {
      dispatch(fetchDashboardDetails());
    }, 300000); // 300,000 ms = 5 minutes

    return () => {
      clearInterval(intervalCall);
    };
  }, [dispatch, navigate, userDetails]);

  return (
    <div className="main-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className={`row ${style.row}`}>
            <div className={`col-xl-12 col-lg-12`}>
              {/* <MapComponent className={style.mapContainer} /> */}
              <NewMapComponet className={style.mapContainer} location = {details?.location} podLocation = {details?.podLocation}/>
            </div>
            {/* <div className={`col-xl-6 col-lg-12`}>
              <Graph />
            </div>
            <div className={`col-xl-6 col-lg-12`}>
              <MapComponent />
            </div> */}
          </div>
          <DashboardCardItem details={details?.count_arr} />
        </>
      )}
    </div>
  );
}

export default Index;

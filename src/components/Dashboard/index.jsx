import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";

import Graph from "./Graph/Graph";
import DashboardCardItem from "./DashboardCard/DashboardCard";
import style from "./index.module.css";
import {postRequestWithToken } from '../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MapComponent from './Map/Map';


function Index() {
  const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
  const navigate = useNavigate();
  const [details, setDetails] = useState([])

  const fetchDetails = () => {
    const obj = {
        userId  : userDetails?.user_id,
        email   : userDetails?.email,
    }
    postRequestWithToken('dashboard', obj, async(response) => {
        if (response.code === 200) {
            setDetails(response?.data);
        } else {
            toast(response.message, {type:'error'})
            console.log('error in dashboard api', response);
        }
    })
}
useEffect(() => {
    if (!userDetails || !userDetails.access_token) {
        navigate('/login'); 
        return; 
    }
    fetchDetails();
}, []);

  return (
    <div className={style.dashboard}>
      <div className={`row ${style.row}`}>
        <div className={`col-xl-6 col-lg-12`}>
          <Graph />
        </div>
        <div className={`col-xl-6 col-lg-12`}>
          <MapComponent />
        </div>
      </div>
      <DashboardCardItem details = {details}/>
    </div>
  );
}

export default Index;

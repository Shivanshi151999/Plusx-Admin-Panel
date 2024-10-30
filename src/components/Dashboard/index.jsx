import React, { useEffect, useState } from 'react';
import Graph from './Graph/Graph'
import Cards from './Cards/Cards'
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function Index() {
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails')); 
  const navigate = useNavigate()

  useEffect(() => {
    if (!userDetails || !userDetails.access_token) {
        navigate('/login'); 
        return; 
    }
}, []);

  return (
    <>
    <Graph />
    <Cards/>
    </>
  );
}

export default Index;
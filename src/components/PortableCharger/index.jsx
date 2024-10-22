import React from "react";
import ChargerList from "./ChargerList/ChargerList";
import ChargerBooking from "./ChargerBooking/ChargerBooking";
import { Outlet } from "react-router-dom";

const index = () => {
  return (
    <>
      {/* <ChargerList/> */}
      {/* <ChargerBooking/> */}
      <Outlet />
    </>
  );
};

export default index;

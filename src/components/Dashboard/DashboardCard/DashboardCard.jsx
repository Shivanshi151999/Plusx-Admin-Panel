import React, { useState } from "react";
import style from "./DashboardCard.module.css";
import DashboardCardItem from "../../SharedComponent/DashboardCardItem/DashboardCardItem";
import { CiAirportSign1 } from "react-icons/ci";

const DashboardCard = () => {
  const [isActiveCard, setIsActiveCard] = useState(0);
  const cardData = [
    {
      icon: <CiAirportSign1 />,
      count: 71,
      title: "App Sign Up",
    },
    {
      icon: <CiAirportSign1 />,
      count: 5,
      title: "No. of Regs. Drivers",
    },
    {
      icon: <CiAirportSign1 />,
      count: 9,
      title: "POD Booking",
    },
    {
      icon: <CiAirportSign1 />,
      count: 35,
      title: "Pick & Drop off",
    },
    {
      icon: <CiAirportSign1 />,
      count: 107,
      title: "Total Public Chargers",
    },
    {
      icon: <CiAirportSign1 />,
      count: 0,
      title: "Total Electric Bike Leasing",
    },
    {
      icon: <CiAirportSign1 />,
      count: 7,
      title: "Total Electric Car Leasing",
    },
    {
      icon: <CiAirportSign1 />,
      count: 15,
      title: "Total EV Guide",
    },
    {
      icon: <CiAirportSign1 />,
      count: 11,
      title: "EV Road Assitance",
    },
    {
      icon: <CiAirportSign1 />,
      count: 17,
      title: "Charger Installation Bookings",
    },
    {
      icon: <CiAirportSign1 />,
      count: 0,
      title: "Total EV Rider Club",
    },
    {
      icon: <CiAirportSign1 />,
      count: 6,
      title: "Total EV Discussion Board",
    },
    {
      icon: <CiAirportSign1 />,
      count: 65,
      title: "Total EV Insurance",
    },
    {
      icon: <CiAirportSign1 />,
      count: 17,
      title: "EV Pre-Sales Testing Bookings",
    },
    {
      icon: <CiAirportSign1 />,
      count: 1,
      title: "Total EV Specialized Shops",
    },
    {
      icon: <CiAirportSign1 />,
      count: 1,
      title: "EV Buy & Sell",
    },
    {
      icon: <CiAirportSign1 />,
      count: 0,
      title: "Total Active Offer",
    },
    {
      icon: <CiAirportSign1 />,
      count: 39,
      title: "Total Register Your Interest",
    },
  ];

  return (
    <div className={style.dashboardCardItem}>
      {cardData.map((data, index) => (
        <DashboardCardItem
          key={index}
          icon={data.icon}
          count={data.count}
          title={data.title}
          isActive={isActiveCard === index}
          onClick={() => setIsActiveCard(index)}
        />
      ))}
    </div>
  );
};

export default DashboardCard;

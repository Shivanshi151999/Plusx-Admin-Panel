import React, { useState } from "react";
import style from "./DashboardCard.module.css";
import DashboardCardItem from "../../SharedComponent/DashboardCardItem/DashboardCardItem";
import { CiAirportSign1 } from "react-icons/ci";

const DashboardCard = ({ details }) => {
  const [isActiveCard, setIsActiveCard] = useState(0);
  const cardData = [
    {
      icon: <CiAirportSign1 />,
      count: details?.find((item) => item.module === "App Sign Up")?.count || 0,
      title: "App Sign Up",
      route: "/app-signup-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "No. of Regs. Drivers")
          ?.count || 0,
      title: "No. of Regs. Drivers",
      route: "/rider-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "POD Bookings")?.count || 0,
      title: "POD Booking",
      route: "/portable-charger/charger-booking-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Pickup & Dropoff Bookings")
          ?.count || 0,
      title: "Pick & Drop off Bookings",
      route: "/pick-and-drop/booking-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total Public Chargers")
          ?.count || 0,
      title: "Total Public Chargers",
      route: "/public-charger-station-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total Electric Bikes Leasing")
          ?.count || 0,
      title: "Total Electric Bike Leasing",
      route: "/electric-bike-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total Electric Cars Leasing")
          ?.count || 0,
      title: "Total Electric Car Leasing",
      route: "/electric-car-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total EV Guide")?.count || 0,
      title: "Total EV Guide",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "EV Road Assistance")?.count ||
        0,
      title: "EV Road Assistance",
      route: "/charger-installation-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Charger Installation Bookings")
          ?.count || 0,
      title: "Charger Installation Bookings",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total EV Rider Clubs")
          ?.count || 0,
      title: "Total EV Rider Club",
      route: "/club-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total EV Discussion Board")
          ?.count || 0,
      title: "Total EV Discussion Board",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total EV Insurance")?.count ||
        0,
      title: "Total EV Insurance",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Pre-Sale Testing Bookings")
          ?.count || 0,
      title: "EV Pre-Sales Testing Bookings",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total EV Specialized Shop")
          ?.count || 0,
      title: "Total EV Specialized Shops",
      route: "/ev-specialized/shop-list",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "EV Buy & Sell")?.count || 0,
      title: "EV Buy & Sell",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total Active Offer")?.count ||
        0,
      title: "Total Active Offer",
      route: "/",
    },
    {
      icon: <CiAirportSign1 />,
      count:
        details?.find((item) => item.module === "Total Register your Interest")
          ?.count || 0,
      title: "Total Register Your Interest",
      route: "/",
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
          route={data.route}
          isActive={isActiveCard === index}
          onClick={() => setIsActiveCard(index)}
        />
      ))}
    </div>
  );
};

export default DashboardCard;

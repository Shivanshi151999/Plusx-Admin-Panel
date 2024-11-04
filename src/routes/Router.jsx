import React from 'react';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard/index.jsx";
import PortableCharger from "../components/PortableCharger/index.jsx";
import AppSignupList from "../components/AppSignUp/AppSignupList.js"
import AppSignup from "../components/AppSignUp/index.jsx";
import EmergencyTeam from "../components/Riders/EmergencyDetails/Details.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import ChargerList from "../components/PortableCharger/ChargerList/ChargerList.jsx";
import Login from  "../components/Login/index.jsx"
import ChargerBookingList from "../components/PortableCharger/ChargerBooking/ChargerBookingList.js";
import ChargerBookingInvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import PortableChargerTimeSlotList from "../components/PortableCharger/TimeSlotLIst/PortableChargerTimeSlotList.js";
import AddPortableChargerTimeSlot from '../components/PortableCharger/TimeSlotLIst/AddTimeSlot.jsx'
import ChargerBookingDetails from "../components/PortableCharger/ChargerBooking/ChargerBookingDetails.js";
import PickAndDrop from "../components/PickAndDrop/index.jsx"
import PickAndDropBookingList from '../components/PickAndDrop/Booking/BookingList.jsx'
import PickAndDropBookingDetails from "../components/PickAndDrop/Booking/BookingDetails.jsx";
import PickAndDropInvoiceList from '../components/PickAndDrop/Invoice/InvoiceList.jsx'
import PickAndDropTimeSlotList from '../components/PickAndDrop/TimeSlot/TimeSlotList.jsx'
import PublicChargerStationList from '../components/PublicChargerStation/StationList.jsx'
import PublicChargerStationDetails from '../components/PublicChargerStation/StationDetails.jsx'

import ChargerInstallationList from '../components/ChargerInstallationList/ChargerInstallationList.jsx'
import EVBuySell from "../components/EVBuySell/index.jsx"
import ChargerInstallationDetails from "../components/ChargerInstallationList/ChargerInstallationDetails.jsx";

import AddCharger from "../components/PortableCharger/ChargerList/AddCharger.jsx"
<<<<<<< Updated upstream
import AddShopListForm from "../components/EVSpecializedShops/ShopList/ShopList/AddShopListForm.jsx"
import EditPortableChargerTimeSlot from '../components/PortableCharger/TimeSlotLIst/EditTimeSlot.jsx';
import EditPortableCharger from '../components/PortableCharger/ChargerList/EditCharger.jsx';
import AddPickAndDropTimeSlot from '../components/PickAndDrop/TimeSlot/AddTimeSlot.jsx';
import EditPickAndDropTimeSlot from '../components/PickAndDrop/TimeSlot/EditTimeSlot.jsx';
import RiderList from '../components/Riders/RiderList.jsx';
import AddEmergencyTeam from '../components/Riders/AddEmergencyTeam.jsx';
import EditEmergencyTeam from '../components/Riders/EditEmergencyTeam.jsx';
import ShopList from '../components/EVSpecializedShops/ShopList/ShopList/ShopList.jsx';
import ServiceList from '../components/EVSpecializedShops/ShopList/ServiceList/ServiceList.jsx';
import BrandList from '../components/EVSpecializedShops/ShopList/BrandList/BrandList.jsx';
import ClubList from '../components/EvRiderClub/ClubList.jsx';
import CarList from '../components/ElectricCarLeasing/CarList.jsx';
import BikeList from '../components/ElectricBikeLeasing/BikeList.jsx';

=======
import AddShopListForm from "../components/EVSpecializedShops/ShopList/AddShopListForm.jsx"
>>>>>>> Stashed changes
const router = createBrowserRouter([
  {
      path: "/login",
      element: <Login />,
  },
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/app-signup-list",
        element: <AppSignupList />,
      },
      {
        path: "/rider-details/:riderId",
        element: <AppSignup />,
      },
      {
        path: "/rider-list",
        element: <RiderList />,
      },
      {
        path: "/emergency-team-details/:rsaId",
        element: <EmergencyTeam />,
      },
      {
        path: "/add-emergency-team",
        element: <AddEmergencyTeam />,
      },
      {
        path: "/edit-emergency-team/:rsaId",
        element: <EditEmergencyTeam />,
      },

      {
        path: "/portable-charger",
        element: <PortableCharger />,
        children: [ 
          {
            path: "charger-list", 
            element: <ChargerList />,
          },
          {
            path: "charger-booking-list",
            element: <ChargerBookingList />,
          },
          {
            path: "charger-booking-details/:bookingId",
            element: <ChargerBookingDetails />,
          },
          {
            path: "charger-booking-invoice-list", 
            element: <ChargerBookingInvoiceList />,
          },
          {
            path: "charger-booking-time-slot-list", 
            element: <PortableChargerTimeSlotList />,
          },
          {
            path: "add-time-slot", 
            element: <AddPortableChargerTimeSlot />,
          },
          {
            path: "edit-time-slot/:slotId", 
            element: <EditPortableChargerTimeSlot />,
          },
        ],
      },
<<<<<<< Updated upstream

      // app signup list

=======
      
>>>>>>> Stashed changes
      {
        path: "/add-shop-list",
        element: <AddShopListForm />,

      },
      {
        path: "/ev-buy-sell",
        element:<EVBuySell/>
      },
      {
        path: "/add-charger",
        element: <AddCharger />,

      },
      {
        path: "/edit-charger/:chargerId",
        element: <EditPortableCharger />,

      },
<<<<<<< Updated upstream

=======
      {
        path: "/rider-details/:riderId",
        element: <AppSignup />,
      },
      {
        path: "/emergency-team",
        element: <EmergencyTeam />,
      },      
>>>>>>> Stashed changes

      {
        path: "/pick-and-drop",
        element: <PickAndDrop />,
        children: [ 
          {
            path: "booking-list", 
            element: <PickAndDropBookingList />,
          },
          {
            path: "booking-details/:requestId", 
            element: <PickAndDropBookingDetails />,
          },
          {
            path: "invoice-list", 
            element: <PickAndDropInvoiceList />,
          },
          {
            path: "time-slot-list", 
            element: <PickAndDropTimeSlotList />,
          },
          {
            path: "add-time-slot", 
            element: <AddPickAndDropTimeSlot />,
          },

          {
            path: "edit-time-slot/:slotId", 
            element: <EditPickAndDropTimeSlot />,
          },
        ],
      },

      //public charger station
      {
        path: "/public-charger-station-list",
        element: <PublicChargerStationList />,
      },
      {
        path: "/public-charger-station-details/:stationId",
        element: <PublicChargerStationDetails />,
      },

      //charger installation
      {
        path: "/charger-installation-list",
        element: <ChargerInstallationList />,
      },
      {
        path: "/charger-installation-details/:requestId",
        element: <ChargerInstallationDetails />,
      },

      //Electric Car Leasing
      {
        path: "/electric-car-list",
        element: <CarList />,
      },

      //Electric Bilke Leasing
      {
        path: "/electric-bike-list",
        element: <BikeList />,
      },

      //Ev Rider Club
      {
        path: "/club-list",
        element: <ClubList />,
      },

      //ev-specialized
      {
        path: "/ev-specialized",
        // element: <ShopList />,
        children: [ 
          {
            path: "shop-list", 
            element: <ShopList />,
          },
          {
            path: "service-list", 
            element: <ServiceList />,
          },
          {
            path: "brand-list", 
            element: <BrandList />,
          },
          
        ],
      },
    ],
  },
]);

function Router() {
  return (
    <>

      <RouterProvider router={router} />

    </>
  );
}
export default Router;
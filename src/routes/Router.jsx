import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard/index.jsx";
import PortableCharger from "../components/PortableCharger/index.jsx";
import AppSignupList from "../components/AppSignUp/AppSignupList.js"
import AppSignup from "../components/AppSignUp/index.jsx";
import EmergencyTeam from "../components/EmergencyTeam/index.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import ChargerList from "../components/PortableCharger/ChargerList/ChargerList.jsx";
import Login from  "../components/Login/index.jsx"
import ChargerBookingList from "../components/PortableCharger/ChargerBooking/ChargerBookingList.js";
import ChargerBookingInvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import PortableChargerTimeSlotList from "../components/PortableCharger/TimeSlotLIst/PortableChargerTimeSlotList.js";
import ChargerBookingDetails from "../components/PortableCharger/ChargerBooking/ChargerBookingDetails.js";

import PickAndDrop from "../components/PickAndDrop/index.jsx"
import PickAndDropBookingList from '../components/PickAndDrop/Booking/BookingList.jsx'
import PickAndDropBookingDetails from "../components/PickAndDrop/Booking/BookingDetails.jsx";
import PickAndDropInvoiceList from '../components/PickAndDrop/Invoice/InvoiceList.jsx'
import PickAndDropTimeSlotList from '../components/PickAndDrop/TimeSlot/TimeSlotList.jsx'

import PublicChargerStationList from '../components/PublicChargerStation/StationList.jsx'
import ChargerInstallationList from '../components/ChargerInstallationList/ChargerInstallationList.jsx'

// import PickAndDropBookingList from '../components/PickAndDrop/BookingList/BookingList.jsx'
import EVBuySell from "../components/EVBuySell/index.jsx"
import ChargerInstallationDetails from "../components/ChargerInstallationList/ChargerInstallationDetails.jsx";

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
        ],
      },

// app signup list
      {
        path: "/app-signup-list",
        element: <AppSignupList />,
      },
      {
        path: "/rider-details/:riderId",
        element: <AppSignup />,
      },
      {
        path: "/emergency-team",
        element: <EmergencyTeam />,
      },      

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
        ],
      },

      //public charger station
      {
        path: "/public-charger-station-list",
        element: <PublicChargerStationList />,
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
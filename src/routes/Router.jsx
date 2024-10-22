import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard/index.jsx";
import PortableCharger from "../components/PortableCharger/index.jsx";
import AppSignupList from "../components/AppSignUp/AppSignupList.js"
import AppSignup from "../components/AppSignUp/index.jsx";
import EmergencyTeam from "../components/EmergencyTeam/index.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import ChargerList from "../components/PortableCharger/ChargerList/ChargerList.jsx";
import ChargerBooking from "../components/PortableCharger/ChargerBooking/ChargerBooking.jsx";
import Login from  "../components/Login/index.jsx"
import ChargerBookingList from "../components/PortableCharger/ChargerBooking/ChargerBookingList.js";
import InvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import ChargerBookingInvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import PortableChargerTimeSlotList from "../components/PortableCharger/TimeSlotLIst/PortableChargerTimeSlotList.js";
import ChargerBookingDetails from "../components/PortableCharger/ChargerBooking/ChargerBookingDetails.js";
import PickAndDropBookingList from '../components/PickAndDrop/BookingList/BookingList.jsx'

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
      },
      {
        path: "/charger-list",
        element: <ChargerList />,
      },
      {
        path: "/charger-booking",
        element: <ChargerBooking />,
      },
      {
        path: "/charger-booking-list",
        element: <ChargerBookingList />,
      },
      {
        path: "/charger-booking-details/:bookingId",
        element: <ChargerBookingDetails />,
      },
      {
        path: "/charger-booking-invoice-list",
        element: <ChargerBookingInvoiceList />,
      },
      {
        path: "/charger-booking-time-slot-list",
        element: <PortableChargerTimeSlotList />,
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

      //pick and drop
      {
        path: "/pick-and-drop-booking-list",
        element: <PickAndDropBookingList />,
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

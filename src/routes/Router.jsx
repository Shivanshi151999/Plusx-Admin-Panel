import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard/index.jsx";
import PortableCharger from "../components/PortableCharger/index.jsx";
import AppSignupList from "../components/AppSignUp/AppSignupList.js"
import AppSignup from "../components/AppSignUp/index.jsx";
import EmergencyTeam from "../components/EmergencyTeam/index.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import ChargerList from "../components/PortableCharger/ChargerList/ChargerList.jsx";
import ChargerBooking from "../components/PortableCharger/ChargerBooking/ChargerBooking.jsx";
import Login from "../components/Login/index.jsx"
import ChargerBookingList from "../components/PortableCharger/ChargerBooking/ChargerBookingList.js";
import InvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import ChargerBookingInvoiceList from "../components/PortableCharger/InvoiceList/InvoiceList.js";
import PortableChargerTimeSlotList from "../components/PortableCharger/TimeSlotLIst/PortableChargerTimeSlotList.js";
import ChargerBookingDetails from "../components/PortableCharger/ChargerBooking/ChargerBookingDetails.js";
<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
import PickAndDrop from "../components/PickAndDrop/index.jsx"
import PickAndDropBookingList from '../components/PickAndDrop/BookingList/BookingList.jsx'
import PickAndDropInvoiceList from '../components/PickAndDrop/Invoice/InvoiceList.jsx'
import PickAndDropTimeSlotList from '../components/PickAndDrop/TimeSlot/TimeSlotList.jsx'
import PublicChargerStationList from '../components/PublicChargerStation/StationList.jsx'
<<<<<<< Updated upstream
import ChargerInstallationList from '../components/ChargerInstallationList/ChargerInstallationList.jsx'

// import PickAndDropBookingList from '../components/PickAndDrop/BookingList/BookingList.jsx'
import EVBuySell from "../components/EVBuySell/index.jsx"
=======
import ChargerInstallationList from '../components/ChargerInstallationList/ChargerInstallationList.jsx';
import Calendar from '../components/SharedComponent/Calendar/Calendar.jsx'
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
        path: "/calendar",
        element: <Calendar />,
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
        path: "/emergency-team",
        element: <EmergencyTeam />,
<<<<<<< Updated upstream
      },      
=======
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
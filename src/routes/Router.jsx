import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "../components/Dashboard/index.jsx";
import PortableCharger from "../components/PortableCharger/index.jsx";
import AppSignup from "../components/AppSignUp/index.jsx";
import EmergencyTeam from "../components/EmergencyTeam/index.jsx";
import Layout from "../components/SharedComponent/Layout.jsx";
import ChargerList from "../components/PortableCharger/ChargerList/ChargerList.jsx";
import ChargerBooking from "../components/PortableCharger/ChargerBooking/ChargerBooking.jsx";
import Login from  "../components/Login/index.jsx"
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
        path: "/charger-booking-invoice-list",
        element: <ChargerBookingInvoiceList />,
      },
      {
        path: "/charger-booking-time-slot-list",
        element: <PortableChargerTimeSlotList />,
      },

      {
        path: "/add-signup",
        element: <AppSignup />,
      },
      {
        path: "/emergency-team",
        element: <EmergencyTeam />,
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

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
import AddChargerStation from '../components/PublicChargerStation/AddChargerStation.jsx';
import EditPublicChargerStation from '../components/PublicChargerStation/EditPublicChargerStation.jsx';
import Invoice from '../components/SharedComponent/Invoice/Invoice.jsx';
import InvoiceDetails from '../components/PortableCharger/InvoiceList/InvoiceDetails.jsx';
import PickAndDropInvoiceDetails from '../components/PickAndDrop/Invoice/InvoiceDetails.jsx'
import GuideList from '../components/EvGuide/GuideList.jsx'
import GuideDetails from '../components/EvGuide/GuideDetails.jsx'
import AddEvGuide from '../components/EvGuide/AddEvGuide.jsx';
import EditEvGuide from '../components/EvGuide/EditEvGuide.jsx';
import AddElectricCar from '../components/ElectricCarLeasing/AddElectricCar.jsx';
import EditElectricCar from '../components/ElectricCarLeasing/EditElectricCar.jsx';
import ElectricCarDetails from '../components/ElectricCarLeasing/ElectricCarDetails.jsx';
import AddElectricBike from '../components/ElectricBikeLeasing/AddElectricBike.jsx';
import EditElectricBike from '../components/ElectricBikeLeasing/EditElectricBike.jsx';
import ElectricBikeDetails from '../components/ElectricBikeLeasing/BikeDetails.jsx';

import EvRoadAssistance from '../components/EvRoadAssistance/index.jsx'
import RoadAssistanceBookingList from '../components/EvRoadAssistance/Booking/BookingList.jsx';
import RoadAssistanceBookingDetails from '../components/EvRoadAssistance/Booking/BookingDetails.jsx'
import RoadAssistanceInvoiceList from '../components/EvRoadAssistance/Invoice/InvoiceList.jsx';
import RoadAssistanceInvoiceDetails from '../components/EvRoadAssistance/Invoice/InvoiceDetails.jsx';
import AddClub from '../components/EvRiderClub/AddClub.jsx';
import EditClub from '../components/EvRiderClub/EditClub.jsx';
import ClubDetails from '../components/EvRiderClub/ClubDetails.jsx'
import Error from '../components/SharedComponent/Error/Error.jsx';

const router = createBrowserRouter([

    {
        path: "/login",
        element: <Login />,
    }, {
        path: "/",
        element: <Layout />,
        children: [ 
            {
                index: true,
                element: <Dashboard />,
            }, {
                path: "/app-signup-list",
                element: <AppSignupList />,
            }, {
                path: "/rider-details/:riderId",
                element: <AppSignup />,
            }, {
                path: "/rider-list",
                element: <RiderList />,
            }, {
                path: "/emergency-team-details/:rsaId",
                element: <EmergencyTeam />,
            }, {
                path: "/add-emergency-team",
                element: <AddEmergencyTeam />,
            },  {
                path: "/edit-emergency-team/:rsaId",
                element: <EditEmergencyTeam />,
            }, {
                path: "/portable-charger",
                element: <PortableCharger />,
                children: [ 
                    {
                        path: "charger-list", 
                        element: <ChargerList />,
                    }, {
                        path: "charger-booking-list",
                        element: <ChargerBookingList />,
                    }, {
                        path: "charger-booking-details/:bookingId",
                        element: <ChargerBookingDetails />,
                    },  {
                        path: "charger-booking-invoice-list", 
                        element: <ChargerBookingInvoiceList />,
                    }, {
                        path: "charger-booking-time-slot-list", 
                        element: <PortableChargerTimeSlotList />,
                    }, {
                        path: "add-time-slot", 
                        element: <AddPortableChargerTimeSlot />,
                    }, {
                        path: "edit-time-slot/:slotId", 
                        element: <EditPortableChargerTimeSlot />,
                    },
                ],
            },
            // app signup list
            {
                path: "/invoice",
                element:<Invoice/>
            }, {
                path: "/invoice/:invoiceId",
                element:<InvoiceDetails/>
            },{
                path: "/add-charger-station",
                element: <AddChargerStation/>,
                
            }, {
                path: "/edit-charger-station/:stationId",
                element: <EditPublicChargerStation/>,
                
            }, 
           
            {
                path: "/add-charger",
                element: <AddCharger />,

            }, {
                path: "/edit-charger/:chargerId",
                element: <EditPortableCharger />,

            }, {
                path: "/pick-and-drop",
                element: <PickAndDrop />,
                children: [ 
                    {
                        path: "booking-list", 
                        element: <PickAndDropBookingList />,
                    }, {
                        path: "booking-details/:requestId", 
                        element: <PickAndDropBookingDetails />,
                    }, {
                        path: "invoice-list", 
                        element: <PickAndDropInvoiceList />,
                    }, {
                        path: "invoice-details/:invoiceId", 
                        element: <PickAndDropInvoiceDetails />,
                    }, {
                        path: "time-slot-list", 
                        element: <PickAndDropTimeSlotList />,
                    }, {
                        path: "add-time-slot", 
                        element: <AddPickAndDropTimeSlot />,
                    }, {
                        path: "edit-time-slot/:slotId", 
                        element: <EditPickAndDropTimeSlot />,
                    },
                ],
            },
            //public charger station
            {
                path: "/public-charger-station-list",
                element: <PublicChargerStationList />,
            }, {
                path: "/public-charger-station-details/:stationId",
                element: <PublicChargerStationDetails />,
            },
            //charger installation
            {
                path: "/charger-installation-list",
                element: <ChargerInstallationList />,
            }, {
                path: "/charger-installation-details/:requestId",
                element: <ChargerInstallationDetails />,
            },
            //Electric Car Leasing
            {
                path: "/electric-car-list",
                element: <CarList />,
            },
            {
                path: "/add-electric-car",
                element: <AddElectricCar />,
            },
            {
                path: "/edit-electric-car/:rentalId",
                element: <EditElectricCar />,
            },
            {
                path: "/electric-car-details/:rentalId",
                element: <ElectricCarDetails />,
            },
            //Electric Bilke Leasing
            {
                path: "/electric-bike-list",
                element: <BikeList />,
            },
            {
                path: "/add-electric-bike",
                element: <AddElectricBike />,
            },
            {
                path: "/edit-electric-bike/:rentalId",
                element: <EditElectricBike />,
            },
            {
                path: "/electric-bike-details/:rentalId",
                element: <ElectricBikeDetails />,
            },
            //Ev Guide
            {
              path: "/ev-guide-list",
              element: <GuideList />,
            },
            {
                path: "/ev-guide-details/:vehicleId",
                element: <GuideDetails />,
            },
            {
                path: "/add-ev-guide",
                element: <AddEvGuide />,
            },
            {
                path: "/edit-ev-guide/:vehicleId",
                element: <EditEvGuide />,
            },

            //road assistance
            {
                path: "/ev-road-assistance",
                element: < EvRoadAssistance/>,
                children: [ 
                     {
                        path: "booking-list",
                        element: < RoadAssistanceBookingList/>,
                    }, {
                        path: "booking-details/:requestId",
                        element: <RoadAssistanceBookingDetails />,
                    },  {
                        path: "invoice-list", 
                        element: <RoadAssistanceInvoiceList />,
                    }, {
                        path: "invoice-details/:invoiceId", 
                        element: <RoadAssistanceInvoiceDetails />,
                    },
                    {
                        path: "charger-booking-time-slot-list", 
                        element: <PortableChargerTimeSlotList />,
                    }, {
                        path: "add-time-slot", 
                        element: <AddPortableChargerTimeSlot />,
                    }, {
                        path: "edit-time-slot/:slotId", 
                        element: <EditPortableChargerTimeSlot />,
                    },
                ],
            },

            //Ev Rider Club
            {
                path: "/club-list",
                element: <ClubList />,
            },
            {
                path: "/add-club",
                element: <AddClub />,
            },
            {
                path: "/edit-club/:clubId",
                element: <EditClub />,
            },
            {
                path: "/club-details/:clubId",
                element: <ClubDetails />,
            },
            //ev-specialized
            {
                path: "/ev-specialized",
                // element: <ShopList />,
                children: [ 
                    {
                        path: "shop-list", 
                        element: <ShopList />,
                    }, {
                        path: "add-shop",
                        element: <AddShopListForm />,
        
                    }, {
                        path: "service-list", 
                        element: <ServiceList />,
                    }, {
                        path: "brand-list", 
                        element: <BrandList />,
                    },
                ],
            },
        ],
    },
    {
        path: "*",
        element: <Error />,
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
export const menuItems = {
    userList: [
        { id: "activeUser", label: "App Sign Up List", path: "/app-signup/app-signup-list" },
        { id: "deletedUser", label: "Deleted Account", path: "/app-signup/deleted-account" },
    ],
    portableCharger: [
        { id: "chargerList", label: "Charger List", path: "/portable-charger/charger-list" },
        { id: "chargerBooking", label: "Charger Booking", path: "/portable-charger/charger-booking-list" },
        { id: "invoiceList", label: "Invoice List", path: "/portable-charger/charger-booking-invoice-list" },
        { id: "timeSlot", label: "Time Slot", path: "/portable-charger/charger-booking-time-slot-list" },

        { id: "deviceList", label: "Device List", path: "/portable-charger/device-list" },
        { id: "areaList", label: "Area List", path: "/portable-charger/area-list" },
        { id: "failedBookingList", label: "Failed Booking", path: "/portable-charger/failed-booking-list" },
    ],
    pickAndDrop: [
        { id: "bookingList", label: "Booking List", path: "/pick-and-drop/booking-list" },
        { id: "invoiceList", label: "Invoice List", path: "/pick-and-drop/invoice-list" },
        { id: "timeSlot", label: "Time Slot", path: "/pick-and-drop/time-slot-list" },
        { id: "failedBookingList", label: "Failed Booking List", path: "/pick-and-drop/failed-booking-list" },
    ],
    evRoadAssistance: [
        { id: "bookingList",       label: "Booking List", path: "/ev-road-assistance/booking-list" },
        { id: "invoiceList",       label: "Invoice List", path: "/ev-road-assistance/invoice-list" },
        { id: "failedBookingList", label: "Failed Booking", path: "/ev-road-assistance/failed-booking-list" },
    ],
    evPreSalesTesting: [
        { id: "testingBooking", label: "Testing Booking", path: "/ev-pre-sales-testing/pre-sales-list" },
        { id: "timeSlot", label: "Time Slot", path: "/ev-pre-sales-testing/time-slot-list" },
    ],
    evSpecializedShops: [
        { id: "shopList", label: "Shop List", path: "/ev-specialized/shop-list" },
        { id: "shopServices", label: "Shop Services", path: "/ev-specialized/service-list" },
        { id: "shopBrands", label: "Shop Brands", path: "/ev-specialized/brand-list" },
    ],
};

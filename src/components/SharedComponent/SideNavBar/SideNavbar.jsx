import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import styles from "./sidenavbar.module.css";
import CompanyLogo from "../CompanyLogo";
import SideBarLinkItem from "./SideBarLinkItem";
import SidebarDropdown from "./SidebarDropdown/SidebarDropdown";
import {
  portableChargerMenuItems,
  pickAndDropMenuItems,
  evRoadAssistanceMenuItems,
  evPreSalesTestingMenuItems,
  evSpecializedShopsMenuItems,
} from "./DropdownMenu";

const SideNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [portableChargerCheckedItems, setPortableChargerCheckedItems] =
    useState({
      chargerList: false,
      chargerBooking: false,
      invoiceList: false,
      timeSlot: false,
    });
  const [pickAndDropCheckedItems, setpickAndDropCheckedItems] = useState({
    bookingList: false,
    invoiceList: false,
    timeSlot: false,
  });
  const [evSpecializedShopsCheckedItems, setEVSpecializedShopsCheckedItems] =
    useState({
      shopList: false,
      shopServices: false,
      shopBrands: false,
    });
  const [evRoadAssistanceCheckedItems, setEVRoadAssistanceCheckedItems] =
    useState({
      bookingList: false,
      invoiceList: false,
    });
  const [evPreSalesTestingCheckedItems, setEVPreSalesTestingCheckedItems] =
    useState({
      testingBooking: false,
      timeSlot: false,
    });

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("/portable-charger")) {
      setPortableChargerCheckedItems({
        chargerList: false,
        chargerBooking: false,
        invoiceList: false,
        timeSlot: false,
      });
    }
    if (!location.pathname.includes("/pick-and-drop")) {
      setpickAndDropCheckedItems({
        bookingList: false,
        invoiceList: false,
        timeSlot: false,
      });
    }
    if (!location.pathname.includes("/ev-specialized")) {
      setEVSpecializedShopsCheckedItems({
        shopList: false,
        shopServices: false,
        shopBrands: false,
      });
    }
    if (!location.pathname.includes("/ev-road-assistance")) {
      setEVRoadAssistanceCheckedItems({
        bookingList: false,
        invoiceList: false,
      });
    }
    if (!location.pathname.includes("/ev-pre-sales-testing")) {
      setEVPreSalesTestingCheckedItems({
        testingBooking: false,
        timeSlot: false,
      });
    }
  }, [location]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const handlePortableChargerItemClicked = (id, e) => {
    e.stopPropagation();

    setPortableChargerCheckedItems((prevState) => {
      const newState = {
        chargerList: false,
        chargerBooking: false,
        invoiceList: false,
        timeSlot: false,
        [id]: true,
      };

      return newState;
    });

    const pathMapping = {
      chargerList: "/portable-charger/charger-list",
      chargerBooking: "/portable-charger/charger-booking-list",
      invoiceList: "/portable-charger/charger-booking-invoice-list",
      timeSlot: "/portable-charger/charger-booking-time-slot-list",
    };

    const path = pathMapping[id];
    if (path) {
      navigate(path);
    }
  };

  const handlePickAndDropItemClicked = (id, e) => {
    e.stopPropagation();

    setpickAndDropCheckedItems((prevState) => {
      const newState = {
        bookingList: false,
        invoiceList: false,
        timeSlot: false,
        [id]: true,
      };

      return newState;
    });

    const pathMapping = {
      bookingList: "/pick-and-drop/booking-list",
      invoiceList: "/pick-and-drop/invoice-list",
      timeSlot: "/pick-and-drop/time-slot-list",
    };

    const path = pathMapping[id];
    if (path) {
      navigate(path);
    }
  };

  const handleEvSpecializedShopsItemClicked = (id, e) => {
    e.stopPropagation();

    setEVSpecializedShopsCheckedItems((prevState) => {
      const newState = {
        shopList: false,
        shopServices: false,
        shopBrands: false,
        [id]: true,
      };

      return newState;
    });

    const pathMapping = {
      shopList: "/ev-specialized/shop-list",
      shopServices: "/ev-specialized/service-list",
      shopBrands: "/ev-specialized/brand-list",
    };

    const path = pathMapping[id];
    if (path) {
      navigate(path);
    }
  };

  const handleEvRoadAssistanceItemClicked = (id, e) => {
    e.stopPropagation();

    setEVRoadAssistanceCheckedItems((prevState) => {
      const newState = {
        bookingList: false,
        invoiceList: false,
        [id]: true,
      };

      return newState;
    });

    const pathMapping = {
      bookingList: "/ev-road-assistance/booking-list",
      invoiceList: "/ev-road-assistance/invoice-list",
    };

    const path = pathMapping[id];
    if (path) {
      navigate(path);
    }
  };

  const handleEvPreSalesTestingItemClicked = (id, e) => {
    e.stopPropagation();

    setEVPreSalesTestingCheckedItems((prevState) => {
      const newState = {
        testingBooking: false,
        timeSlot: false,
        [id]: true,
      };

      return newState;
    });

    const pathMapping = {
      testingBooking: "/ev-pre-sales-testing/pre-sales-list",
      timeSlot: "/ev-pre-sales-testing/time-slot-list",
    };

    const path = pathMapping[id];
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <NavLink to="/">
          <CompanyLogo />
        </NavLink>
      </div>
      <ul className={styles.menuList}>
        <SideBarLinkItem label="Dashboard" path="/" />
        <SideBarLinkItem label="App Sign Up List" path="/app-signup-list" />
        <SideBarLinkItem label="Drivers" path="/rider-list" />
        <SidebarDropdown
          menuName="Portable Charger"
          menuItems={portableChargerMenuItems}
          openDropdown={openDropdown}
          handleItemClick={handlePortableChargerItemClicked}
          toggleDropdown={toggleDropdown}
          checkedItems={portableChargerCheckedItems}
        />
        <SidebarDropdown
          menuName="Pick & Drop"
          menuItems={pickAndDropMenuItems}
          openDropdown={openDropdown}
          handleItemClick={handlePickAndDropItemClicked}
          toggleDropdown={toggleDropdown}
          checkedItems={pickAndDropCheckedItems}
        />
        <SideBarLinkItem
          label="Public Chargers Station"
          path="/public-charger-station-list"
        />
        <SideBarLinkItem
          label="Electric Car Leasing"
          path="/electric-car-list"
        />
        <SideBarLinkItem
          label="Electric Bike Leasing"
          path="/electric-bike-list"
        />
        <SideBarLinkItem label="EV Guide" path="/ev-guide-list" />
        <SidebarDropdown
          menuName="EV Road Assistance"
          menuItems={evRoadAssistanceMenuItems}
          openDropdown={openDropdown}
          handleItemClick={handleEvRoadAssistanceItemClicked}
          toggleDropdown={toggleDropdown}
          checkedItems={evRoadAssistanceCheckedItems}
        />
        <SideBarLinkItem
          label="Charger Installation"
          path="/charger-installation-list"
        />
        <SideBarLinkItem label="EV Rider Clubs" path="/club-list" />
        <SideBarLinkItem
          label="EV Discussion Board"
          path="/discussion-board-list"
        />
        <SideBarLinkItem label="EV Insurance" path="/ev-insurance-list" />
        <SidebarDropdown
          menuName="EV Pre-Sales Testing"
          menuItems={evPreSalesTestingMenuItems}
          openDropdown={openDropdown}
          handleItemClick={handleEvPreSalesTestingItemClicked}
          toggleDropdown={toggleDropdown}
          checkedItems={evPreSalesTestingCheckedItems}
        />
        <SidebarDropdown
          menuName="EV Specialized Shops"
          menuItems={evSpecializedShopsMenuItems}
          openDropdown={openDropdown}
          handleItemClick={handleEvSpecializedShopsItemClicked}
          toggleDropdown={toggleDropdown}
          checkedItems={evSpecializedShopsCheckedItems}
        />
        <SideBarLinkItem label="EV Buy & Sell" path="/ev-buy-sell" />
        <SideBarLinkItem label="Offer" path="/offer-list" />
        <SideBarLinkItem label="Register Interest" path="/interest-list" />
        <SideBarLinkItem label="Coupon" path="/coupon-list" />
        <SideBarLinkItem
          label="Subscription Package"
          path="/subscription-list"
        />
      </ul>
    </div>
  );
};

export default SideNavbar;

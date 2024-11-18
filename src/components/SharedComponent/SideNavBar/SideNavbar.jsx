import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import styles from "./sidenavbar.module.css";
import CompanyLogo from "../CompanyLogo";
import SideBarLinkItem from "./SideBarLinkItem";
import SidebarDropdown from "./SidebarDropdown/SidebarDropdown";
import { menuItems } from "./DropdownMenu";

const SideNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
    portableCharger: {
      chargerList: false,
      chargerBooking: false,
      invoiceList: false,
      timeSlot: false,
    },
    pickAndDrop: { bookingList: false, invoiceList: false, timeSlot: false },
    evRoadAssistance: { bookingList: false, invoiceList: false },
    evPreSalesTesting: { testingBooking: false, timeSlot: false },
    evSpecializedShops: {
      shopList: false,
      shopServices: false,
      shopBrands: false,
    },
  });

  const location = useLocation();

  const handleItemClicked = (menu, id, e) => {
    e.stopPropagation();

    setCheckedItems((prevState) => ({
      ...prevState,
      [menu]: {
        ...prevState[menu],
        [id]: true,
        ...Object.fromEntries(
          Object.keys(prevState[menu]).map((key) =>
            key !== id ? [key, false] : [key, true]
          )
        ),
      },
    }));
  };

  useEffect(() => {
    const storedCheckedItems = sessionStorage.getItem("checkedItems");
    if (storedCheckedItems) {
      const parsedData = JSON.parse(storedCheckedItems);
      setCheckedItems(parsedData.checkedItems);
      setOpenDropdown(parsedData.dropdown);
    }
  }, []);

  useEffect(() => {
    const obj = {
      dropdown: openDropdown,
      checkedItems: checkedItems,
    };
    if (obj.dropdown) {
      sessionStorage.setItem("checkedItems", JSON.stringify(obj));
    }
  }, [checkedItems, openDropdown]);

  useEffect(() => {
    setCheckedItems((prevState) => ({
      portableCharger: location.pathname.includes("/portable-charger")
        ? prevState.portableCharger
        : {
            chargerList: false,
            chargerBooking: false,
            invoiceList: false,
            timeSlot: false,
          },
      pickAndDrop: location.pathname.includes("/pick-and-drop")
        ? prevState.pickAndDrop
        : { bookingList: false, invoiceList: false, timeSlot: false },
      evRoadAssistance: location.pathname.includes("/ev-road-assistance")
        ? prevState.evRoadAssistance
        : { bookingList: false, invoiceList: false },
      evPreSalesTesting: location.pathname.includes("/ev-pre-sales-testing")
        ? prevState.evPreSalesTesting
        : { testingBooking: false, timeSlot: false },
      evSpecializedShops: location.pathname.includes("/ev-specialized")
        ? prevState.evSpecializedShops
        : { shopList: false, shopServices: false, shopBrands: false },
    }));

    const dropdownPaths = [
      "/portable-charger",
      "/pick-and-drop",
      "/ev-road-assistance",
      "/ev-pre-sales-testing",
      "/ev-specialized",
    ];

    if (!dropdownPaths.some((path) => location.pathname.includes(path))) {
      sessionStorage.removeItem("checkedItems");
      setOpenDropdown(null);
    }
  }, [location]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
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
          menuItems={menuItems.portableCharger}
          openDropdown={openDropdown}
          handleItemClick={(id, e) =>
            handleItemClicked("portableCharger", id, e)
          }
          toggleDropdown={toggleDropdown}
          checkedItems={checkedItems.portableCharger}
        />
        <SidebarDropdown
          menuName="Pick & Drop"
          menuItems={menuItems.pickAndDrop}
          openDropdown={openDropdown}
          handleItemClick={(id, e) => handleItemClicked("pickAndDrop", id, e)}
          toggleDropdown={toggleDropdown}
          checkedItems={checkedItems.pickAndDrop}
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
          menuItems={menuItems.evRoadAssistance}
          openDropdown={openDropdown}
          handleItemClick={(id, e) =>
            handleItemClicked("evRoadAssistance", id, e)
          }
          toggleDropdown={toggleDropdown}
          checkedItems={checkedItems.evRoadAssistance}
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
          menuItems={menuItems.evPreSalesTesting}
          openDropdown={openDropdown}
          handleItemClick={(id, e) =>
            handleItemClicked("evPreSalesTesting", id, e)
          }
          toggleDropdown={toggleDropdown}
          checkedItems={checkedItems.evPreSalesTesting}
        />
        <SidebarDropdown
          menuName="EV Specialized Shops"
          menuItems={menuItems.evSpecializedShops}
          openDropdown={openDropdown}
          handleItemClick={(id, e) =>
            handleItemClicked("evSpecializedShops", id, e)
          }
          toggleDropdown={toggleDropdown}
          checkedItems={checkedItems.evSpecializedShops}
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

import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import styles from "./sidenavbar.module.css";
import CompanyLogo from "../CompanyLogo";
import SideBarLinkItem from "./SideBarLink";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

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

        {/* Portable Charger Dropdown */}
        <div className={styles.menuItemDiv}>
          <li
            className={styles.menuItemdropdown}
            onClick={() => toggleDropdown("portableCharger")}
          >
            Portable Charger
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          </li>
          {openDropdown === "portableCharger" && (
            <ul className={styles.subMenu}>
              {/* Charger List */}
              <li
                className={`${
                  portableChargerCheckedItems.chargerList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handlePortableChargerItemClicked("chargerList", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="chargerList"
                  checked={portableChargerCheckedItems.chargerList}
                  onChange={(e) =>
                    handlePortableChargerItemClicked("chargerList", e)
                  }
                />
                <label
                  htmlFor="chargerList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/portable-charger/charger-list"
                  className={({ isActive }) =>
                    isActive ? styles.activeText : ""
                  }
                  // onClick={(e) => e.stopPropagation()}end
                >
                  Charger List
                </NavLink>
              </li>

              {/* Charger Booking */}
              <li
                className={`${
                  portableChargerCheckedItems.chargerBooking
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handlePortableChargerItemClicked("chargerBooking", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="chargerBooking"
                  checked={portableChargerCheckedItems.chargerBooking}
                  onChange={(e) =>
                    handlePortableChargerItemClicked("chargerBooking", e)
                  }
                />
                <label
                  htmlFor="chargerBooking"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/portable-charger/charger-booking-list"
                  className={({ isActive }) =>
                    isActive ? styles.activeText : ""
                  }
                  // onClick={(e) => e.stopPropagation()}
                >
                  Charger Booking
                </NavLink>
              </li>

              {/* Invoice List */}
              <li
                className={`${
                  portableChargerCheckedItems.invoiceList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handlePortableChargerItemClicked("invoiceList", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="invoiceList"
                  checked={portableChargerCheckedItems.invoiceList}
                  onChange={(e) =>
                    handlePortableChargerItemClicked("invoiceList", e)
                  }
                />
                <label
                  htmlFor="invoiceList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/portable-charger/charger-booking-invoice-list"
                  className={({ isActive }) =>
                    isActive ? styles.activeText : ""
                  }
                  // onClick={(e) => e.stopPropagation()}
                >
                  Invoice List
                </NavLink>
              </li>

              {/* Time Slot */}
              <li
                className={`${
                  portableChargerCheckedItems.timeSlot
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePortableChargerItemClicked("timeSlot", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="timeSlot"
                  checked={portableChargerCheckedItems.timeSlot}
                  onChange={(e) =>
                    handlePortableChargerItemClicked("timeSlot", e)
                  }
                />
                <label htmlFor="timeSlot" className={styles.checkmark}></label>
                <NavLink
                  to="/portable-charger/charger-booking-time-slot-list"
                  className={({ isActive }) =>
                    isActive ? styles.activeText : ""
                  }
                  // onClick={(e) => e.stopPropagation()}
                >
                  Time Slot
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* Pick & Drop Dropdown */}
        <div className={styles.menuItemDiv}>
          <li
            className={styles.menuItemdropdown}
            onClick={() => toggleDropdown("pickDrop")}
          >
            Pick & Drop
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          </li>
          {openDropdown === "pickDrop" && (
            <ul className={styles.subMenu}>
              <li
                className={`${
                  pickAndDropCheckedItems.bookingList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePickAndDropItemClicked("bookingList", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="bookingList"
                  checked={pickAndDropCheckedItems.bookingList}
                  onChange={(e) =>
                    handlePickAndDropItemClicked("bookingList", e)
                  }
                />
                <label
                  htmlFor="bookingList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/pick-and-drop/booking-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Booking List
                </NavLink>
              </li>
              <li
                className={`${
                  pickAndDropCheckedItems.invoiceList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePickAndDropItemClicked("invoiceList", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="invoiceList"
                  checked={pickAndDropCheckedItems.invoiceList}
                  onChange={(e) =>
                    handlePickAndDropItemClicked("invoiceList", e)
                  }
                />
                <label
                  htmlFor="invoiceList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/pick-and-drop/invoice-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Invoice List
                </NavLink>
              </li>
              <li
                className={`${
                  pickAndDropCheckedItems.timeSlot
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePickAndDropItemClicked("timeSlot", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="timeSlot"
                  checked={pickAndDropCheckedItems.timeSlot}
                  onChange={(e) => handlePickAndDropItemClicked("timeSlot", e)}
                />
                <label htmlFor="timeSlot" className={styles.checkmark}></label>
                <NavLink
                  to="/pick-and-drop/time-slot-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Time Slot
                </NavLink>
              </li>
            </ul>
          )}
        </div>

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

        {/* EV Road Assistance Dropdown */}
        <div className={styles.menuItemDiv}>
          <li
            className={styles.menuItemdropdown}
            onClick={() => toggleDropdown("evRoadAssistance")}
          >
            EV Road Assistance
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          </li>
          {openDropdown === "evRoadAssistance" && (
            <ul className={styles.subMenu}>
              <li
                className={`${
                  evRoadAssistanceCheckedItems.bookingList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvRoadAssistanceItemClicked("bookingList", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="bookingList"
                  checked={evRoadAssistanceCheckedItems.bookingList}
                  onChange={(e) =>
                    handleEvRoadAssistanceItemClicked("bookingList", e)
                  }
                />
                <label
                  htmlFor="bookingList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/ev-road-assistance/booking-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Booking List
                </NavLink>
              </li>
              <li
                className={`${
                  evRoadAssistanceCheckedItems.invoiceList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvRoadAssistanceItemClicked("invoiceList", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="invoiceList"
                  checked={evRoadAssistanceCheckedItems.invoiceList}
                  onChange={(e) =>
                    handleEvRoadAssistanceItemClicked("invoiceList", e)
                  }
                />
                <label
                  htmlFor="invoiceList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/ev-road-assistance/invoice-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Invoice List
                </NavLink>
              </li>
            </ul>
          )}
        </div>

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

        {/* EV Pre-Sales Testing Dropdown */}
        <div className={styles.menuItemDiv}>
          <li
            className={styles.menuItemdropdown}
            onClick={() => toggleDropdown("evPreSales")}
          >
            EV Pre-Sales Testing
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          </li>
          {openDropdown === "evPreSales" && (
            <ul className={styles.subMenu}>
              <li
                className={`${
                  evPreSalesTestingCheckedItems.testingBooking
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvPreSalesTestingItemClicked("testingBooking", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="testingBooking"
                  checked={evPreSalesTestingCheckedItems.testingBooking}
                  onChange={(e) =>
                    handleEvPreSalesTestingItemClicked("testingBooking", e)
                  }
                />
                <label
                  htmlFor="testingBooking"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/ev-pre-sales-testing/pre-sales-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Testing Booking
                </NavLink>
              </li>
              <li
                className={`${
                  evPreSalesTestingCheckedItems.timeSlot
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvPreSalesTestingItemClicked("timeSlot", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="timeSlot"
                  checked={evPreSalesTestingCheckedItems.timeSlot}
                  onChange={(e) =>
                    handleEvPreSalesTestingItemClicked("timeSlot", e)
                  }
                />
                <label htmlFor="timeSlot" className={styles.checkmark}></label>
                <NavLink
                  to="/ev-pre-sales-testing/time-slot-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Time Slot
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        {/* EV Specialized Shops Dropdown */}
        <div className={styles.menuItemDiv}>
          <li
            className={styles.menuItemdropdown}
            onClick={() => toggleDropdown("evShops")}
          >
            EV Specialized Shops
            <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
          </li>
          {openDropdown === "evShops" && (
            <ul className={styles.subMenu}>
              <li
                className={`${
                  evSpecializedShopsCheckedItems.shopList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvSpecializedShopsItemClicked("shopList", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="shopList"
                  checked={evSpecializedShopsCheckedItems.shopList}
                  onChange={(e) =>
                    handleEvSpecializedShopsItemClicked("shopList", e)
                  }
                />
                <label htmlFor="shopList" className={styles.checkmark}></label>
                <NavLink
                  to="/ev-specialized/shop-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Shop List
                </NavLink>
              </li>
              <li
                className={`${
                  evSpecializedShopsCheckedItems.shopServices
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvSpecializedShopsItemClicked("shopServices", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="shopServices"
                  checked={evSpecializedShopsCheckedItems.shopServices}
                  onChange={(e) =>
                    handleEvSpecializedShopsItemClicked("shopServices", e)
                  }
                />
                <label
                  htmlFor="shopServices"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/ev-specialized/service-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Shop Services
                </NavLink>
              </li>
              <li
                className={`${
                  evSpecializedShopsCheckedItems.shopBrands
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) =>
                  handleEvSpecializedShopsItemClicked("shopBrands", e)
                }
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="shopBrands"
                  checked={evSpecializedShopsCheckedItems.shopBrands}
                  onChange={(e) =>
                    handleEvSpecializedShopsItemClicked("shopBrands", e)
                  }
                />
                <label
                  htmlFor="shopBrands"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/ev-specialized/brand-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Shop Brands
                </NavLink>
              </li>
            </ul>
          )}
        </div>

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

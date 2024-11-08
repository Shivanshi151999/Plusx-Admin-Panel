import React, { useEffect, useState } from "react";
import styles from "./sidenavbar.module.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import CompanyLogo from "../CompanyLogo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

const SideNavbar = () => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [checkedItems, setCheckedItems] = useState({
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

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!location.pathname.includes("/portable-charger")) {
      setCheckedItems({
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
  }, [location]);

  const toggleDropdown = (menu) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  // const handleItemClick = (id, path) => {
  //   setCheckedItems((prevState) => ({
  //     ...prevState,
  //     [id]: !prevState[id],
  //   }));
  //   navigate(path);
  // };

  const handleItemClick = (id, e) => {
    // Prevent default action
    e.stopPropagation();

    // Reset all checkboxes to false, then set the clicked one to true
    setCheckedItems((prevState) => {
      // Create a new state object
      const newState = {
        chargerList: false,
        chargerBooking: false,
        invoiceList: false,
        timeSlot: false,
        [id]: true, // Set the clicked item to true
      };

      return newState;
    });

    // Map of paths based on item IDs
    const pathMapping = {
      chargerList: "/portable-charger/charger-list",
      chargerBooking: "/portable-charger/charger-booking-list",
      invoiceList: "/portable-charger/charger-booking-invoice-list",
      timeSlot: "/portable-charger/charger-booking-time-slot-list",
    };

    // Navigate to the path associated with the item
    const path = pathMapping[id];
    if (path) {
      navigate(path);
    }
  };

  const handlePickAndDropItemClick = (id, e) => {
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

  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <CompanyLogo />
      </div>
      <ul className={styles.menuList}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Dashboard</li>
        </NavLink>
        <NavLink
          to="/app-signup-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>App Sign Up List</li>
        </NavLink>
        <NavLink
          to="/rider-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Drivers</li>
        </NavLink>

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
                className={`${styles.menuItemContainer} ${
                  checkedItems.chargerList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handleItemClick("chargerList", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="chargerList"
                  checked={checkedItems.chargerList}
                  onChange={(e) => handleItemClick("chargerList", e)}
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
                className={`${styles.menuItemContainer} ${
                  checkedItems.chargerBooking
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handleItemClick("chargerBooking", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="chargerBooking"
                  checked={checkedItems.chargerBooking}
                  onChange={(e) => handleItemClick("chargerBooking", e)}
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
                className={`${styles.menuItemContainer} ${
                  checkedItems.invoiceList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handleItemClick("invoiceList", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="invoiceList"
                  checked={checkedItems.invoiceList}
                  onChange={(e) => handleItemClick("invoiceList", e)}
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
                className={`${styles.menuItemContainer} ${
                  checkedItems.timeSlot
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handleItemClick("timeSlot", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="timeSlot"
                  checked={checkedItems.timeSlot}
                  onChange={(e) => handleItemClick("timeSlot", e)}
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
                className={`${styles.menuItemContainer} ${
                  pickAndDropCheckedItems.bookingList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePickAndDropItemClick("bookingList", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="bookingList"
                  checked={pickAndDropCheckedItems.bookingList}
                  onChange={(e) => handlePickAndDropItemClick("bookingList", e)}
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
                className={`${styles.menuItemContainer} ${
                  pickAndDropCheckedItems.invoiceList
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePickAndDropItemClick("invoiceList", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="invoiceList"
                  checked={pickAndDropCheckedItems.invoiceList}
                  onChange={(e) => handlePickAndDropItemClick("invoiceList", e)}
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
                className={`${styles.menuItemContainer} ${
                  pickAndDropCheckedItems.timeSlot
                    ? styles.activeItem
                    : styles.inactiveItem
                }`}
                onClick={(e) => handlePickAndDropItemClick("timeSlot", e)}
              >
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="timeSlot"
                  checked={pickAndDropCheckedItems.timeSlot}
                  onChange={(e) => handlePickAndDropItemClick("timeSlot", e)}
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

        <NavLink
          to="/public-charger-station-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Public Chargers Station</li>
        </NavLink>
        <NavLink
          to="/electric-car-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Electric Car Leasing</li>
        </NavLink>
        <NavLink
          to="/electric-bike-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Electric Bike Leasing</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>EV Guide</li>
        </NavLink>

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
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="bookingList"
                />
                <label
                  htmlFor="bookingList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/sii"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Booking List
                </NavLink>
              </li>
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="invoiceList"
                />
                <label
                  htmlFor="invoiceList"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/sii"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Invoice List
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <NavLink
          to="/charger-installation-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Charger Installation</li>
        </NavLink>
        <NavLink
          to="/club-list"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>EV Rider Clubs</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>EV Discussion Board</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>EV Insurance</li>
        </NavLink>

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
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="testingBooking"
                />
                <label
                  htmlFor="testingBooking"
                  className={styles.checkmark}
                ></label>
                <NavLink
                  to="/sii"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Testing Booking
                </NavLink>
              </li>
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="timeSlot"
                />
                <label htmlFor="timeSlot" className={styles.checkmark}></label>
                <NavLink
                  to="/sii"
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
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="shopList"
                />
                <label htmlFor="shopList" className={styles.checkmark}></label>
                <NavLink
                  to="/ev-specialized/shop-list"
                  className={({ isActive }) => (isActive ? styles.active : "")}
                >
                  Shop List
                </NavLink>
              </li>
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="shopServices"
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
              <li>
                <input
                  className={styles.checkboxInput}
                  type="checkbox"
                  id="shopBrands"
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

        <NavLink
          to="/ev-buy-sell"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>EV Buy & Sell</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Offer</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Register Interest</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Coupon</li>
        </NavLink>
        <NavLink
          to="/sii"
          className={({ isActive }) =>
            isActive ? `${styles.menuItem} ${styles.active}` : styles.menuItem
          }
        >
          <li>Subscription Package</li>
        </NavLink>
      </ul>
    </div>
  );
};

export default SideNavbar;

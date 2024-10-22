  import React, { useState } from 'react';
  import styles from './sidenavbar.module.css';
  import { NavLink, useNavigate } from 'react-router-dom';
  import CompanyLogo from '../CompanyLogo';
  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

  const SideNavbar = () => {
    const [openDropdown, setOpenDropdown] = useState(null);
    const [checkedItems, setCheckedItems] = useState({
      chargerList: false,
      chargerBooking: false,
      invoiceList: false,
      timeSlot: false,
    });

    const navigate = useNavigate();

    const toggleDropdown = (menu) => {
      setOpenDropdown(openDropdown === menu ? null : menu);
    };

    const handleItemClick = (id, path) => {
      setCheckedItems((prevState) => ({
        ...prevState,
        [id]: !prevState[id],
      }));
      navigate(path);
    };
    return (
      <div className={styles.sidebar}>
        <div className={styles.logo}>
          <CompanyLogo />
        </div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <NavLink to="/" className={({ isActive }) => (isActive ? styles.active : '')}>
              Dashboard
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/add-signup" className={({ isActive }) => (isActive ? styles.active : '')}>
              App Sign Up List
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/emergency-team" className={({ isActive }) => (isActive ? styles.active : '')}>
              Emergency Team
            </NavLink>
          </li>

          {/* Portable Charger Dropdown */}
          <div className={styles.menuItemDiv}>
            <li
            className={styles.menuItemdropdown}
              onClick={() => toggleDropdown('portableCharger')}
            >
              Portable Charger
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
            </li>
            {openDropdown === 'portableCharger' && (
              <ul className={styles.subMenu}>
                {/* Charger List */}
                <li
                  className={`${styles.menuItemContainer} ${checkedItems.chargerList ? styles.activeItem : styles.inactiveItem}`}
                  onClick={() => handleItemClick('chargerList')}
                >
                  <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id="chargerList"
                    checked={checkedItems.chargerList}
                    onChange={(e) => handleItemClick('chargerList', e)} 
                  />
                  <label htmlFor="chargerList" className={styles.checkmark}></label>
                  <NavLink
                    to='/charger-list'
                    className={({ isActive }) => (isActive ? styles.activeText : '')}
                    onClick={(e) => e.stopPropagation()}end
                  >
                    Charger List
                  </NavLink>
                </li>

                {/* Charger Booking */}
                <li
                  className={`${styles.menuItemContainer} ${checkedItems.chargerBooking ? styles.activeItem : styles.inactiveItem}`}
                  onClick={() => handleItemClick('chargerBooking')}
                >
                  <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id="chargerBooking"
                    checked={checkedItems.chargerBooking}
                    onChange={(e) => handleItemClick('chargerBooking', e)}
                  />
                  <label htmlFor="chargerBooking" className={styles.checkmark}></label>
                  <NavLink
                    to="/charger-booking-list"
                    className={({ isActive }) => (isActive ? styles.activeText : '')}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Charger Booking
                  </NavLink>
                </li>

                {/* Invoice List */}
                <li
                  className={`${styles.menuItemContainer} ${checkedItems.invoiceList ? styles.activeItem : styles.inactiveItem}`}
                  onClick={() => handleItemClick('invoiceList' )}
                >
                  <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id="invoiceList"
                    checked={checkedItems.invoiceList}
                    onChange={(e) => handleItemClick('invoiceList', e)}
                  />
                  <label htmlFor="invoiceList" className={styles.checkmark}></label>
                  <NavLink
                    to="/charger-booking-invoice-list"
                    className={({ isActive }) => (isActive ? styles.activeText : '')}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Invoice List
                  </NavLink>
                </li>

                {/* Time Slot */}
                <li
                  className={`${styles.menuItemContainer} ${checkedItems.timeSlot ? styles.activeItem : styles.inactiveItem}`}
                  onClick={() => handleItemClick('timeSlot',  )}
                >
                  <input
                    className={styles.checkboxInput}
                    type="checkbox"
                    id="timeSlot"
                    checked={checkedItems.timeSlot}
                    onChange={(e) => handleItemClick('timeSlot', e)}
                  />
                  <label htmlFor="timeSlot" className={styles.checkmark}></label>
                  <NavLink
                    to="/charger-booking-time-slot-list"
                    className={({ isActive }) => (isActive ? styles.activeText : '')}
                    onClick={(e) => e.stopPropagation()}
                  >
                    Time Slot
                  </NavLink>
                </li>
              </ul>
            )}
          </div>
          {/* Pick & Drop Dropdown */}
          <div className={styles.menuItemDiv}>
            <li className={styles.menuItemdropdown} onClick={() => toggleDropdown('pickDrop')}>
              Pick & Drop
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
            </li>
            {openDropdown === 'pickDrop' && (
              <ul className={styles.subMenu}>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="bookingList" />
                  <label htmlFor="bookingList" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Booking List
                  </NavLink>

                </li>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="invoiceList" />
                  <label htmlFor="invoiceList" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Invoice List
                  </NavLink>

                </li>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="timeSlot" />
                  <label htmlFor="timeSlot" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Time Slot
                  </NavLink>

                </li>
              </ul>
            )}
          </div>

          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Public Chargers Bookings
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Electric Car Leasing
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Electric Bike Leasing
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              EV Guide
            </NavLink>
          </li>

          {/* EV Road Assistance Dropdown */}
          <div className={styles.menuItemDiv}>
            <li className={styles.menuItemdropdown} onClick={() => toggleDropdown('evRoadAssistance')}>
              EV Road Assistance
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
            </li>
            {openDropdown === 'evRoadAssistance' && (
              <ul className={styles.subMenu}>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="bookingList" />
                  <label htmlFor="bookingList" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Booking List
                  </NavLink>

                </li>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="invoiceList" />
                  <label htmlFor="invoiceList" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Invoice List
                  </NavLink>

                </li>
              </ul>
            )}
          </div>

          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Charger Installation
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              EV Rider Clubs
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              EV Discussion Board
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              EV Insurance
            </NavLink>
          </li>

          {/* EV Pre-Sales Testing Dropdown */}
          <div className={styles.menuItemDiv}>
            <li className={styles.menuItemdropdown} onClick={() => toggleDropdown('evPreSales')}>
              EV Pre-Sales Testing
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
            </li>
            {openDropdown === 'evPreSales' && (
              <ul className={styles.subMenu}>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="testingBooking" />
                  <label htmlFor="testingBooking" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Testing Booking
                  </NavLink>

                </li>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="timeSlot" />
                  <label htmlFor="timeSlot" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Time Slot
                  </NavLink>

                </li>
              </ul>
            )}
          </div>

          {/* EV Specialized Shops Dropdown */}
          <div className={styles.menuItemDiv}>
            <li className={styles.menuItemdropdown} onClick={() => toggleDropdown('evShops')}>
              EV Specialized Shops
              <FontAwesomeIcon icon={faChevronRight} className={styles.arrow} />
            </li>
            {openDropdown === 'evShops' && (
              <ul className={styles.subMenu}>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="shopList" />
                  <label htmlFor="shopList" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Shop List
                  </NavLink>

                </li>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="shopServices" />
                  <label htmlFor="shopServices" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Shop Services
                  </NavLink>

                </li>
                <li>
                  <input className={styles.checkboxInput} type="checkbox" id="shopBrands" />
                  <label htmlFor="shopBrands" className={styles.checkmark}></label>
                  <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
                    Shop Brands
                  </NavLink>

                </li>
              </ul>
            )}
          </div>

          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              EV Buy & Sell
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Offer
            </NavLink></li>
          <li className={styles.menuItem}> <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
            Register Interest
          </NavLink>

          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Coupon
            </NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/sii" className={({ isActive }) => (isActive ? styles.active : '')}>
              Subscription Package
            </NavLink>
          </li>
        </ul>
      </div>
    );
  };

  export default SideNavbar;

import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import Notification from "../../../assets/images/Notification.svg";
import DefaultProfileIcon from "../../../assets/images/Profile.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import {postRequestWithToken } from '../../../api/Requests';
import moment from 'moment';

const Header = () => {
  const navigate = useNavigate();
  const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [userImage, setUserImage] = useState(DefaultProfileIcon);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Thank You for Your Booking! Our portable charger service for your EV." },
    { id: 2, text: "Your order is confirmed. We will notify you once it's shipped." },
    { id: 3, text: "New message received from your supplier." },
    // Add more notifications as needed
  ]);
  const [totalPages, setTotalPages]  = useState(1);
  const [totalCount, setTotalCount]  = useState(1)

  // Refs to track dropdown containers
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  const fetchList = (page =1, appliedFilters = {}) => {
    const obj = {
        userId: userDetails?.user_id,
        email: userDetails?.email,
        page_no: page,
        // service_type: 'Portable Charger',
        ...appliedFilters,
    };

    postRequestWithToken('notification-list', obj, async (response) => {
        if (response.code === 200) {
            setNotifications(response?.data);
            setTotalPages(response?.total_page || 1);
            setTotalCount(response?.total || 1)
        } else {
            console.log('error in notification-list api', response);
        }
    });
};

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if (userDetails?.image) {
      const baseUrl = userDetails?.base_url;
      const img = userDetails?.image;
      const imgPath = `${baseUrl}${img}`;
      setUserImage(imgPath);
    }
    fetchList()

  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Toggle functions
  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    setProfileOpen(false);
  };

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
    setNotificationOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("userDetails");
    navigate("/login");
  };

  return (
    <div className={styles.headerContainer}>
      <div
        className={styles.notificationContainer}
        onClick={toggleNotification}
        ref={notificationRef} // Attach ref to notification container
      >
        <img src={Notification} alt="Notification" />
        {isNotificationOpen && (
          <div className={styles.notificationDropdown}>
            <div className={styles.notificationSection}>
  
              {notifications.slice(0, 3).map((notification) => {
                const formattedTime = moment(notification.created_at).format('hh:mm A');
                const formattedDate = moment(notification.created_at).format('DD-MM-YYYY');

                return (
                  <div className={styles.notificationContent} key={notification.id}>
                    <div className={styles.notificationContentsection}>
                      <div className={styles.notificationTitle}>{notification.heading}</div>
                      <div className={styles.notificationText}>{notification.description}</div>
                    </div>
                    <div className={styles.notificationDate}>
                      <span className={styles.notificationTime}>
                        {formattedTime} <br />
                        {formattedDate}
                      </span>
                    </div>
                  </div>
                );
              })}

            </div>
            <div className={styles.notificationBottomSection}>
              <div className={styles.notificationCount}>
                {notifications.length} Notifications
              </div>
              <Link to="/notification-list">
                <div className={styles.notificationAllList}>See All</div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div
        className={styles.profileContainer}
        onClick={toggleProfile}
        ref={profileRef}
      >
        <img src={userImage} className={styles.profileImage} />
        {/* Profile Dialog Section */}
        {isProfileOpen && (
          <div className={styles.profileDropdown}>
            <div
              className={`${styles.profileDropdownOption} ${styles.profileDropdownOptionSelected}`}
            >
              <RiLogoutCircleLine className={styles.ImgContainer} />
              <p>Profile</p>
            </div>
            <div
              className={`${styles.profileDropdownsOption}`}
              onClick={handleLogout}
            >
              <CgProfile className={styles.ImgContainer} />
              <p>Logout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

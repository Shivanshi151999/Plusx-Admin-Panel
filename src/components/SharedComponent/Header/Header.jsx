import React, { useState, useEffect, useRef } from "react";
import styles from "./header.module.css";
import Notification from "../../../assets/images/Notification.svg";
import DefaultProfileIcon from "../../../assets/images/Profile.svg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";

const Header = () => {
  const navigate = useNavigate();
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [userImage, setUserImage] = useState(DefaultProfileIcon);
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Thank You for Your Booking! Our portable charger service for your EV." },
    { id: 2, text: "Your order is confirmed. We will notify you once it's shipped." },
    { id: 3, text: "New message received from your supplier." },
    // Add more notifications as needed
  ]);

  // Refs to track dropdown containers
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const userDetails = JSON.parse(sessionStorage.getItem("userDetails"));
    if (userDetails?.image) {
      const baseUrl = userDetails?.base_url;
      const img = userDetails?.image;
      const imgPath = `${baseUrl}${img}`;
      setUserImage(imgPath);
    }
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
              {notifications.map((notification) => (
                <div className={styles.notificationContent} key={notification.id}>
                  <div className={styles.notificationContentsection}>
                    <div className={styles.notificationTitle}>Portable Charger</div>
                    <div className={styles.notificationText}>{notification.text}</div>
                  </div>
                  <div className={styles.notificationDate}>
                   <span className={styles.notificationTime}>11:55AM <br/>12-12-2024</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.notificationBottomSection}>
              <div className={styles.notificationCount}>
                {notifications.length} Notifications
              </div>
              <Link to="">
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

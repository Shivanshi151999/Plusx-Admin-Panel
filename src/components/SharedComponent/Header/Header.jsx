import React, { useState } from 'react';
import styles from './header.module.css';
import Notification from '../../../assets/images/Notification.svg';
import ProfileIcon from '../../../assets/images/Profile.svg';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate()
  const [isNotificationOpen, setNotificationOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);

  // Toggle functions
  const toggleNotification = () => {
    setNotificationOpen(!isNotificationOpen);
    setProfileOpen(false); // Close profile dropdown if open
  };

  const toggleProfile = () => {
    setProfileOpen(!isProfileOpen);
    setNotificationOpen(false); // Close notification dropdown if open
  };

  const handleLogout = () => {
    sessionStorage.removeItem('userDetails')
    navigate('/login');
  }

  return (
    <div className={styles.headerContainer}>
      {/* Notification Section */}
      <div className={styles.notificationContainer} onClick={toggleNotification}>
        <img src={Notification} alt="Notification" />
        {isNotificationOpen && (
          <div className={styles.notificationDropdown}>
            <div className={styles.notificationSection}>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
              <div className={styles.notificationContent}>
                <div className={styles.notificationBox}>P</div>
                <div className={styles.notificationText}>Thank You for Your Booking! our portable charger service for your EV.</div>
              </div>
            </div>
            <div className={styles.notificationBottomSection}>
              <div className={styles.notificationCount}>12 Notifications</div>
              <Link to=''>
                <div className={styles.notificationAllList}>See All</div>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Profile Section */}
      <div className={styles.profileContainer} onClick={toggleProfile}>
        <img src={ProfileIcon} alt="Profile Icon" />
        {isProfileOpen && (
          <div className={styles.profileDropdown}>
            <p>Profile</p>
            <p onClick={handleLogout}>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;

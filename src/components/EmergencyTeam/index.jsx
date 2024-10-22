import React from 'react'
import styles from './EmergencyDetails/emergency.module.css'
import EmergencyCards from './EmergencyDetails/EmergencyCards'
import EmergencyDetails from './EmergencyDetails/EmergencyDetails'
import EmergencyList from './EmergencyDetails/EmergencyList'

const index = () => {
  return (
    <div className={styles.emergencyContainer}>
      <EmergencyCards/>
      <EmergencyDetails/>
      <EmergencyList/>
    </div>
  )
}

export default index
import React from 'react'
import styles from './chargerbooking.module.css'
import EditHeader from '../../SharedComponent/Edit/EditHeader'
import EditContentSection from '../../SharedComponent/Edit/EditHeader'
import EditFeature from '../../SharedComponent/Edit/EditHeader'
import EditImage from '../../SharedComponent/Edit/EditHeader'

const ChargerBooking = () => {
  return (
    <div className={styles.chargerBookingContainer} >
      <EditHeader />
      <EditContentSection />
      <EditFeature />
      <EditImage />
    </div>
  )
}

export default ChargerBooking
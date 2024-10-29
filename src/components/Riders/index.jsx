import React, { useEffect, useState } from 'react';
import styles from './EmergencyDetails/emergency.module.css'
import EmergencyCards from '../Riders/EmergencyDetails/EmergencyCards'
import EmergencyDetails from '../Riders/EmergencyDetails/EmergencyDetails'
import EmergencyList from '../Riders/EmergencyDetails/EmergencyList'
import { postRequestWithToken } from '../../api/Requests';
import { useParams } from 'react-router-dom';
import moment from 'moment';

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
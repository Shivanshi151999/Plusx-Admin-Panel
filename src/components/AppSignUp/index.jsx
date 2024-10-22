import React from 'react'
import styles from './appsign.module.css'
import DetailsHeader from '../SharedComponent/Details/DetailsHeader'
import DetailsSection from '../SharedComponent/Details/DetailsSection'
import DetailsList from '../SharedComponent/Details/DetailsList'
import DetailsVehicleList from '../SharedComponent/Details/DetailsVehicleList'
const index = () => {
  return (
    <div className={styles.appSignupSection}>
      <DetailsHeader />
      <DetailsSection />
      <DetailsList />
      <DetailsVehicleList />
    </div>
  )
}

export default index
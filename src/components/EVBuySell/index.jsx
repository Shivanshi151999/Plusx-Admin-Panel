import React from 'react'
import styles from './evbuysell.module.css'
import EditHeader from '../SharedComponent/Edit/EditHeader'
import EditContentSection from '../SharedComponent/Edit/EditContentSection'
import EditFeature from '../SharedComponent/Edit/EditFeature'
import EditImage from '../SharedComponent/Edit/EditImage'

const index = () => {
  return (
    <div className='main-container'>
    <EditHeader />
      <EditContentSection />
      <EditFeature />
      {/* <EditImage /> */}
      </div>
  )
}

export default index
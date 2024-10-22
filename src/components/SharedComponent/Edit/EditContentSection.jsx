import React from 'react'
import styles from './edit.module.css'

const  editChargerContentSection = () => {
  return (
    <div className="container-fluid">
      <div className={styles.editChargerContentSection}>
        <div className="row">
          <div className="col-xl-4 col-lg-6 col-12">
            <div className={styles.editChargerContainer}>
              <span className={styles.editChargerChargerHeading}>Charger Name</span>
              <span className={styles.editChargerContent}>Super Charger</span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-12">
            <div className={styles.editChargerContainer}>
              <span className={styles.editChargerHeading}>Charger Type</span>
              <span className={styles.editChargerContent}>On demand service</span>
            </div>
          </div>
          <div className="col-xl-4 col-lg-6 col-12">
            <div className={styles.editChargerContainer}>
              <span className={styles.editChargerHeading}>Charger Price</span>
              <span className={styles.editChargerContent}>AED 150</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default  editChargerContentSection
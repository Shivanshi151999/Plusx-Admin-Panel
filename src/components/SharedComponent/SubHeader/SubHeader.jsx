import React from 'react'
import styles from './subheader.module.css'
import Plus from '../../../assets/images/Plus.svg';
import Filter from '../../../assets/images/Filter.svg';
const SubHeader = ({heading}) => {
    return (
        <div className={styles.subHeaderContainer}>
            <div className={styles.headerCharger}>
                <div className={styles.headingList}>{heading}</div>
                <div className={styles.subHeaderButtonSection}>
                    <div className={styles.addButtonSection}>
                        <div className={styles.addButtonImg}>
                            <img src={Plus} alt='plus' />
                        </div>
                        <div className={styles.addButtonText}>Add</div>
                    </div>
                    <div className={styles.addButtonSection}>
                        <div className={styles.addButtonImg}>
                            <img src={Filter} alt='Filter' />
                        </div>
                        <div className={styles.addButtonText}>Filter</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SubHeader
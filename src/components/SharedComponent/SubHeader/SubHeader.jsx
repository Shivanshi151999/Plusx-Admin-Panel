import React, { useState } from 'react';
import styles from './subheader.module.css';
import Plus from '../../../assets/images/Plus.svg';
import Filter from '../../../assets/images/Filter.svg';
import AccordionFilter from '../Accordion/Accordions';

const SubHeader = ({ heading, fetchFilteredData }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    return (
        <div className={styles.subHeaderContainer}>
            <div className={styles.headerCharger}>
                <div className={styles.headingList}>{heading}</div>


                    <div className={styles.subHeaderButtonSection}>
                        {heading !== "App Signup List" && (
                        <div className={styles.addButtonSection}>
                            <div className={styles.addButtonImg}>
                                <img src={Plus} alt='plus' />
                            </div>
                            <div className={styles.addButtonText}>Add</div>
                        </div>
                        )}
                        <div className={styles.addButtonSection} onClick={toggleAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Filter} alt='Filter' />
                            </div>
                            <div className={styles.addButtonText}>Filter</div>
                        </div>
                    </div>
                
            </div>

            <AccordionFilter isOpen={isAccordionOpen} fetchFilteredData={fetchFilteredData}/>
        </div>
    );
};

export default SubHeader;

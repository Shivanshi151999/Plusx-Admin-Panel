import React, { useState } from 'react';
import styles from './subheader.module.css';
import Plus from '../../../assets/images/Plus.svg';
import Filter from '../../../assets/images/Filter.svg';
import AccordionFilter from '../Accordion/Accordions';
import { Link } from 'react-router-dom';


const SubHeader = ({ heading, fetchFilteredData, dynamicFilters, filterValues, addButtonProps }) => {
    const [isAccordionOpen, setIsAccordionOpen] = useState(false);
    const toggleAccordion = () => {
        setIsAccordionOpen(!isAccordionOpen);
    };

    const shouldShowAddButton = 
    !["App Signup List","Portable Charger Booking List", "Pick & Drop Booking List", "Portable Charger Invoice List",
     "Pick & Drop Invoice List", "Charger Installation List"].includes(heading);

    const shouldShowFilterButton = 
        heading !== "Portable Charger List" && 
        heading !== "Portable Charger Invoice List" && 
        heading !== "Pick & Drop Invoice List" &&
        heading !== "Portable Charger Slot List" &&
        heading !== "Pick & Drop Time Slot List" &&
        heading !== "Charger Installation List" 

    return (
        <div className={styles.subHeaderContainer}>
            <div className={styles.headerCharger}>
                <div className={styles.headingList}>{heading}</div>


                <div className={styles.subHeaderButtonSection}>
                {shouldShowAddButton && (
                        <Link to={addButtonProps?.link}>
                            <div className={styles.addButtonSection}>
                                <div className={styles.addButtonImg}>
                                    <img src={Plus} alt='plus' />
                                </div>
                                <div className={styles.addButtonText}>{addButtonProps?.heading}</div>
                            </div>
                        </Link>
                    )}

                   {shouldShowFilterButton && (
                        <div className={styles.addButtonSection} onClick={toggleAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Filter} alt='Filter' />
                            </div>
                            <div className={styles.addButtonText}>Filter</div>
                        </div>
                    )}
                </div>

            </div>

            <AccordionFilter 
                type = {heading}
                isOpen={isAccordionOpen} 
                fetchFilteredData={fetchFilteredData} 
                dynamicFilters={dynamicFilters} 
                filterValues={filterValues} 
            />
        </div>
    );
};

export default SubHeader;

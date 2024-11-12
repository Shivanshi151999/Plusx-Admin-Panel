import React, { useState } from 'react';
import styles from './subheader.module.css';
import Plus from '../../../assets/images/Plus.svg';
import Filter from '../../../assets/images/Filter.svg';
import Search from '../../../assets/images/Search.svg';
import SearchAccordion from '../Accordion/SearchAccodion';
import AccordionFilter from '../Accordion/Accordions'; 
import { Link } from 'react-router-dom';

const SubHeader = ({ heading, fetchFilteredData, dynamicFilters, filterValues, addButtonProps, searchTerm }) => {
    const [isSearchAccordionOpen, setIsSearchAccordionOpen] = useState(false);
    const [isFilterAccordionOpen, setIsFilterAccordionOpen] = useState(false);


    const toggleSearchAccordion = () => {
        setIsSearchAccordionOpen(!isSearchAccordionOpen);
        setIsFilterAccordionOpen(false); 
    };

    const toggleFilterAccordion = () => {
        setIsFilterAccordionOpen(!isFilterAccordionOpen);
        setIsSearchAccordionOpen(false); 
    };

    const shouldShowAddButton = 
        !["App Signup List", "Portable Charger Booking List", "Pick & Drop Booking List", "Portable Charger Invoice List",
          "Pick & Drop Invoice List", "Charger Installation List", "Ev Road Assitance Booking List", 
          "Road Assistance Invoice List", "Board List", "Insurance List", "Buy Sell List", "Interest List"
        ].includes(heading);

    const shouldShowFilterButton = 
        heading !== "Portable Charger List" && 
        heading !== "Portable Charger Invoice List" && 
        heading !== "Pick & Drop Invoice List" &&
        heading !== "Road Assistance Invoice List" &&
        // heading !== "Pick & Drop Time Slot List" &&
        heading !== "Charger Installation List";

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
                    
                    {/* Search Button */}
                    <div className={styles.addButtonSection} onClick={toggleSearchAccordion}>
                        <div className={styles.addButtonImg}>
                            <img src={Search} alt='Search' />
                        </div>
                        <div className={styles.addButtonText}>Search</div>
                    </div>

                    {/* Filter Button */}
                    {shouldShowFilterButton && (
                        <div className={styles.addButtonSection} onClick={toggleFilterAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Filter} alt='Filter' />
                            </div>
                            <div className={styles.addButtonText}>Filter</div>
                        </div>
                    )}
                </div>
            </div>

            {/* Render SearchAccordion when isSearchAccordionOpen is true */}
            {isSearchAccordionOpen && (
                <SearchAccordion 
                    type={heading}
                    isOpen={isSearchAccordionOpen} 
                    fetchFilteredData={fetchFilteredData} 
                    // dynamicFilters={dynamicFilters} 
                    searchTerm = {searchTerm}
                    filterValues={filterValues} 
                />
            )}

            {/* Render AccordionFilter when isFilterAccordionOpen is true */}
            {isFilterAccordionOpen && (
                <AccordionFilter 
                    type={heading}
                    isOpen={isFilterAccordionOpen} 
                    fetchFilteredData={fetchFilteredData} 
                    dynamicFilters={dynamicFilters} 
                    filterValues={filterValues} 
                />
            )}
        </div>
    );
};

export default SubHeader;

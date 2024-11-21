import React, { useState } from 'react';
import styles from './subheader.module.css';
import Plus from '../../../assets/images/Plus.svg';
import Filter from '../../../assets/images/Filter.svg';
import Search from '../../../assets/images/Search.svg';
import SearchAccordion from '../Accordion/SearchAccodion';
import AccordionFilter from '../Accordion/Accordions';
import { Link } from 'react-router-dom';
import FormModal from '../CustomModal/FormModal';
import ModalAssign from '../BookingDetails/ModalAssign'
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { postRequestWithToken } from '../../../api/Requests';


const SubHeader = ({ heading, fetchFilteredData, dynamicFilters, filterValues, 
                     addButtonProps, searchTerm, count, modalTitle, setRefresh,apiEndPoint, 
                     nameKey  }) => {

    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const [isSearchAccordionOpen, setIsSearchAccordionOpen] = useState(false);
    const [isFilterAccordionOpen, setIsFilterAccordionOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [showPopup, setShowPopup] = useState(false);
    const [name, setName] = useState("");

    const handleAddClick = () => {
        setShowPopup(true); 
    };

    const handleClosePopup = () => {
        setShowPopup(false); 
        setName("");
      };
    
      const handleReasonChange = (e) => {
        setName(e.target.value); 
      };
    
      const handleConfirmAdd = () => {
        if (!name.trim()) {
            toast("Please enter name.", {type:'error'})
            return;
          }
        const obj = {
            userId     : userDetails?.user_id,
            email      : userDetails?.email,
            [nameKey]  : name
        };
    
        postRequestWithToken(apiEndPoint, obj, async (response) => {
            if (response.code === 200) {
                toast(response.message, {type:'success'})
                    setTimeout(() => {
                        setRefresh(prev => !prev);
                    }, 1500);
                setShowPopup(false);
            } else {
                toast(response.message, {type:'error'})
                console.log(`Error in ${apiEndPoint} API`, response);
            }
        });
        
      };

    const toggleSearchAccordion = () => {
        setIsSearchAccordionOpen(!isSearchAccordionOpen);
        setIsFilterAccordionOpen(false);
    };

    const toggleFilterAccordion = () => {
        setIsFilterAccordionOpen(!isFilterAccordionOpen);
        setIsSearchAccordionOpen(false);
    };

    const toggleModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        // setSelectedBookingId(null);
    };

    const shouldShowAddButton =
        !["App Signup List", "Portable Charger Booking List", "Pick & Drop Booking List", "Portable Charger Invoice List",
            "Pick & Drop Invoice List", "Charger Installation List", "Ev Road Assitance Booking List",
            "Road Assistance Invoice List", "Board List", "Insurance List", "Buy Sell List", "Interest List",
            "Subscription List", "EV Pre-Sale Testing Booking List", "Ev Road Assistance Invoice List", "Ev Discussion Board List",
            "Ev Insurance List", "Ev Buy Sell List", "Register Interest List"].includes(heading);

    const shouldShowFilterButton =
        heading !== "Portable Charger List" &&
        heading !== "Road Assistance Invoice List" &&
        heading !== "Charger Installation List" &&
        heading !== "Ev Rider Clubs List" &&
        heading !== "Ev Discussion Board List" &&
        heading !== "Ev Insurance List" &&
        heading !== "Ev Specialized Shop List" &&
        heading !== "Ev Specialized Shop Service List" &&
        heading !== "Ev Specialized Shop Brand List" &&
        heading !== "Ev Buy Sell List" &&
        heading !== "Offer List" &&
        heading !== "Pick & Drop Time Slot List" &&
        heading !== "Portable Charger Slot List" &&
        heading !== "Time Slot List" &&
        heading !== "Register Interest List";

    const shouldShowSearchButton =
        heading !== "Offer List" &&
        heading !== "Portable Charger Invoice List" &&
        heading !== "Pick & Drop Invoice List" &&
        heading !== "Pick & Drop Time Slot List" &&
        heading !== "Portable Charger Slot List" &&
        heading !== "Time Slot List" &&
        heading !== "Ev Road Assistance Invoice List"

    const showCard =
        heading !== "App Signup List" &&
        heading !== "EV Pre-Sale Testing Booking List" &&
        heading !== "Public Chargers List" &&
        heading !== "Drivers List" &&
        heading !== "Portable Charger Booking List" &&
        heading !== "Pick & Drop Booking List" &&
        heading !== "Charger Installation List" &&
        heading !== "Pick & Drop Invoice List" &&
        heading !== "Pick & Drop Time Slot List" &&
        heading !== "Add POD List" &&
        heading !== "Portable Charger List" &&
        heading !== "Portable Charger Invoice List" &&
        heading !== "Portable Charger Slot List" &&
        heading !== "Ev Road Assistance Invoice List" &&
        heading !== "Time Slot List" && 
        heading !== "Ev Specialized Shop Service List" && 
        heading !== "Ev Specialized Shop Brand List" && 
        heading !== "Ev Road Assitance Booking List" &&
        heading !== "POD Brand List" &&
        heading !== "POD Device List"

    const showHeading = 
      heading !== "Offer List" &&
      heading !== "Subscription List" &&
      heading !== "Coupon List" &&
      heading !== "Register Interest List" &&
      heading !== "Ev Buy & Sell List" &&
      heading !== "Ev Specialized Shop List" &&
     
      
      
      heading !== "Ev Insurance List" && 
      heading !== "Ev Discussion Board List" && 
      heading !== "Ev Rider Clubs List" && 
     
      heading !== "EV Guide List" &&
      heading !== "Electric Bikes Leasing List" &&
      heading !== "Electric Cars Leasing List" 

    return (
        <div className={styles.subHeaderContainer}>
            <div className={styles.headerCharger}>
                { showHeading && (
                    <div className={styles.headingList}>{heading}</div>
                )}
                {showCard && (
                <div className={styles.headCardSection}>
                    <div className={styles.headCardNumber}>{count || 0}</div>
                    <div className={styles.headCardText}>Total {heading}</div>
                </div>
                )}
                <div className={styles.subHeaderButtonSection}>
                    {shouldShowAddButton && (
                        (heading === "Ev Specialized Shop Brand List" || heading === "Ev Specialized Shop Service List") ? (
                            <div className={styles.addButtonSection} onClick={handleAddClick}>
                                <div className={styles.addButtonImg}>
                                    <img src={Plus} alt='plus' />
                                </div>
                                <div className={styles.addButtonText}>{addButtonProps?.heading}</div>
                            </div>
                        ) : (
                            <Link to={addButtonProps?.link}>
                                <div className={styles.addButtonSection}>
                                    <div className={styles.addButtonImg}>
                                        <img src={Plus} alt='plus' />
                                    </div>
                                    <div className={styles.addButtonText}>{addButtonProps?.heading}</div>
                                </div>
                            </Link>
                        )
                    )}

                    {/* Search Button */}
                    {shouldShowSearchButton && (
                        <div className={styles.addButtonSection} onClick={toggleSearchAccordion}>
                            <div className={styles.addButtonImg}>
                                <img src={Search} alt='Search' />
                            </div>
                            <div className={styles.addButtonText}>Search</div>
                        </div>
                    )}

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
                    searchTerm={searchTerm}
                    filterValues={filterValues}
                />
            )}

            {isFilterAccordionOpen && (
                <AccordionFilter
                    type={heading}
                    isOpen={isFilterAccordionOpen}
                    fetchFilteredData={fetchFilteredData}
                    dynamicFilters={dynamicFilters}
                    filterValues={filterValues}
                />
            )}

            {showPopup && (
                <ModalAssign
                    isOpen={showPopup}
                    onClose={handleClosePopup}
                    onAssign={handleConfirmAdd}
                    buttonName = 'Submit'
                >
                    <div className="modalHeading">{modalTitle}</div>
                    <input
                        id="name"
                        placeholder={modalTitle}
                        className="modal-textarea"
                        rows="4"
                        value={name} 
                        onChange={handleReasonChange}
                                
                    />
                </ModalAssign>
                
            )}
        </div>
    );
};

export default SubHeader;

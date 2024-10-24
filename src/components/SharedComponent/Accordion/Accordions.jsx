import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import styles from './accordion.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from "../Calendar/Calendar"

const AccordionFilter = ({ isOpen, fetchFilteredData }) => {
    const [showContent, setShowContent] = useState(isOpen);

    const [filterValues, setFilterValues] = useState({
        riderName: '',
        riderEmail: '',
        riderMobile: '',
        addedFrom: 'Select Device',
    });

    useEffect(() => {
        if (isOpen) {
            setShowContent(true);
        } else {
            const timer = setTimeout(() => setShowContent(false), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFilterValues(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    };

    const handleBlur = () => {
        fetchFilteredData(filterValues);
    };

    return (
        <div data-aos="fade-left">
            <Accordion defaultActiveKey="0" className={`${styles.accordionContainer} ${isOpen ? styles.open : ''}`}>
                <Card className={styles.accordionCard}>
                    <Accordion.Collapse eventKey="0">
                        <AnimatePresence>
                            {showContent && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Card.Body>
                                        <form className={styles.filterForm}>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="riderName">Customer Name</label>
                                                <input 
                                                 className={styles.filterInput} 
                                                 type="text" id="riderName" 
                                                 name="riderName" 
                                                 value={filterValues.riderName}
                                                    onChange={handleInputChange}
                                                    onBlur={handleBlur}
                                                 autoComplete='off'
                                                  />
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="email">Email</label>
                                                <input 
                                                className={styles.filterInput} 
                                                type="email" 
                                                id="email" 
                                                name="riderEmail" 
                                                value={filterValues.riderEmail}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                autoComplete='off' />
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="mobile">Mobile</label>
                                                <input className={styles.filterInput} type="text" 
                                                id="mobile" 
                                                name="riderMobile" 
                                                value={filterValues.riderMobile}
                                                onChange={handleInputChange}
                                                onBlur={handleBlur}
                                                autoComplete='off' />
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="ios">Device By</label>
                                                <select className={styles.filterSelect} id="ios"
                                                 name="addedFrom"
                                                 value={filterValues.addedFrom}
                                                 onChange={(e) => {
                                                    handleInputChange(e); 
                                                    fetchFilteredData({ addedFrom: e.target.value });  
                                                }}
                                                 >
                                                    <option value="">Select Device</option>
                                                    <option value="Android">Android</option>
                                                    <option value="IOS">IOS</option>
                                                </select>
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="device">Date Picker</label>
                                                <Calendar/>
                                            </div>
                                        </form>
                                    </Card.Body>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        </div>
    );
};

export default AccordionFilter;

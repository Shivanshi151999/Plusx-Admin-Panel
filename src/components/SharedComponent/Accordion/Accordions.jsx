import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import styles from './accordion.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Calendar from "../Calendar/Calendar";
import { format } from 'date-fns';

const AccordionFilter = ({ type, isOpen, fetchFilteredData, dynamicFilters, filterValues }) => {
    const [showContent, setShowContent] = useState(isOpen);

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
        fetchFilteredData({ ...filterValues, [name]: value }); 
    };
    
    const handleBlur = () => {
        fetchFilteredData(filterValues);
    };

    const handleDateChange = (range) => {
        if (!range || range.length < 2) {
            fetchFilteredData({
                ...filterValues,
                start_date: null,
                end_date: null
            });
            return;
        }
    
        const [start, end] = range;
        const formattedStart = format(start, 'yyyy-MM-dd');
        const formattedEnd = format(end, 'yyyy-MM-dd');
        fetchFilteredData({
            ...filterValues,
            start_date: formattedStart,
            end_date: formattedEnd
        });
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
                                             {/* { (type === "Portable Charger Booking List" || type === "Pick & Drop Booking List") && ( */}
                                             <div className={`col-xl-4 ol-lg-6 col-12 ${styles.filterItem}`}>
                                                    <label className={styles.filterLabel} htmlFor="date_filter">Selec</label>
                                                    <Calendar handleDateChange={handleDateChange}/>
                                                </div>
                                            {/* )} */}
                                            {dynamicFilters?.map((filter) => (
                                                <div key={filter.name} className={`col-xl-4 col-lg-6 col-12 ${styles.filterItem}`}>
                                                    <label className={styles.filterLabel} htmlFor={filter.name}>{filter.label}</label>
                                                    {filter.type === 'select' ? (
                                                        <select 
                                                            className={styles.filterSelect} 
                                                            id={filter.name}
                                                            name={filter.name}
                                                            value={filterValues[filter.name] || ''}
                                                            onChange={handleInputChange}
                                                            onBlur={handleBlur}
                                                        >
                                                            {filter.options.map((option) => (
                                                                <option key={option.value} value={option.value}>{option.label}</option>
                                                            ))}
                                                        </select>
                                                    ) : (
                                                        <input 
                                                            className={styles.filterInput} 
                                                            type={filter.type} 
                                                            id={filter.name} 
                                                            name={filter.name} 
                                                            value={filterValues[filter.name] || ''}
                                                            onChange={handleInputChange}
                                                            onBlur={handleBlur}
                                                            autoComplete='off'
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                          
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

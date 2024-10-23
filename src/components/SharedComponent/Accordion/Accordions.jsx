import React, { useEffect, useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import styles from './accordion.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const AccordionFilter = ({ isOpen }) => {
    const [showContent, setShowContent] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setShowContent(true); 
        } else {
            const timer = setTimeout(() => setShowContent(false), 300); 
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

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
                                                <input className={styles.filterInput} type="text" id="riderName" name="customerName" autoComplete='off' />
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="email">Email</label>
                                                <input className={styles.filterInput} type="email" id="email" name="email" autoComplete='off' />
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="mobile">Mobile</label>
                                                <input className={styles.filterInput} type="text" id="mobile" name="mobile" autoComplete='off' />
                                            </div>
                                            <div className={styles.filterItem}>
                                                <label className={styles.filterLabel} htmlFor="ios">Device By</label>
                                                <select className={styles.filterSelect} id="ios" name="ios">
                                                    <option value="Android">Android</option>
                                                    <option value="IOS">IOS</option>
                                                </select>
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

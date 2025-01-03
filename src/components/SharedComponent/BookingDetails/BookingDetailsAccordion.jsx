import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bookingdetails.module.css';
import moment from 'moment';


const BookingDetailsAccordion = ({history, rsa, imageUrl, fieldMapping, title }) => {
    
    const statusTitles = {
        P   : 'Open',
        CNF : 'Booking Confirmed',
        A   : 'Assigned',
        ER  : 'Enroute',
        RL  : 'Reached Location',
        CS  : 'Charging Started',
        CC  : 'Charging Completed',
        PU  : 'Picked Up',
        VP  : 'Vehicle Pickup',
        RS  : 'Reached Charging Spot',
        WC  : 'Work Completed',
        DO  : 'Drop Off',
        C   : "Cancelled",
    };

    const sections = history?.map((item) => ({
        title       : statusTitles[item?.order_status] || 'Unknown Status',
        details     : item.details,
        time        : item.created_at ? moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a') : null,
        rsa_name     : item?.rsa_name,
        showRSA     : item?.order_status !== 'CNF',
        // showInvoice : item?.order_status === 'PU',

        showImage    : item?.order_status === 'PU' || item?.order_status === 'WC',
        // imageUrl     : rsa.imageUrl + ''+item?.image,
        imageUrls    : item?.order_status === 'PU' 
                        ? (Array.isArray(item.images) ? item.images.map(img => rsa.imageUrl + img) : [rsa.imageUrl + item?.image]) 
                        : [],
        order_status : item?.order_status,
        cancel_by    : item?.cancel_by == 'Admin' ?  'Admin' : rsa?.customerName,
        reason       : item?.reason,
    }));
    
    const [activeKey, setActiveKey] = useState("0");
    const handleAccordionToggle = (key) => {
        setActiveKey(activeKey === key ? null : key);
    };
    
    return (
        <div className={styles.accordionContainer}>
            <div className={styles.header}>
                <div className={styles.status}>{title || "Order Status"}</div>
            </div>
            <Accordion activeKey={activeKey} className={styles.accordion}>
                        
                {sections?.map((section, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index} className={styles.accordionItem}>
                        <Accordion.Header onClick={() => handleAccordionToggle(index.toString())} className={styles.accordionHeader}>
                            <span>{section.title}</span>
                            <span className={styles.icon} style={{ marginLeft: '8px', color: 'white' }}>
                                {activeKey === index.toString() ? '▲' : '▼'}
                            </span>
                        </Accordion.Header>
                        <Accordion.Body className={styles.accordionBody}>
                            {section.showRSA && section.rsa_name && (
                                <p><strong>Driver:</strong> {section?.rsa_name}</p>
                            )}
                            {section.order_status == 'C' && (
                                <>
                                    <p>Cancelled By : { section?.cancel_by } <br /></p>
                                    <p>Reason : { section?.reason } <br /> </p> 
                                </>
                            )}
                            {/* {section.showImage && (
                                <div>
                                    <p><strong>Image:</strong></p>
                                    <img src={section?.imageUrl} alt="Img" style={{ maxWidth: '700px', height: '250px', margin: '5px' }} />
                                </div>
                            )} */}
                            {section.showImage && section.imageUrls.length > 0 && (
                                <div>
                                    <p><strong>Images:</strong></p>
                                    <div className={styles.imageContainer}>
                                        {section.imageUrls.flatMap(url => Array(4).fill(url)).map((url, index) => (
                                            <img key={index} src={url} alt={`Img${index}`} style={{ maxWidth: '700px', height: '250px', margin: '5px' }} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {section.time && <p className={styles.accodionPTag}> {section.time}</p>}
                        </Accordion.Body>
                    </Accordion.Item>
                ))}
            </Accordion>
        </div>
    );
};

export default BookingDetailsAccordion;

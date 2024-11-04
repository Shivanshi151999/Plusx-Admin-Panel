import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bookingdetails.module.css';
import moment from 'moment';


const BookingDetailsAccordion = ({history, rsa }) => {

  const statusTitles = {
    CNF: 'Booking Confirmed',
    A: 'Assigned',
    ER: 'Enroute',
    RL: 'Reached Location',
    CS: 'Charging Started',
    CC: 'Charging Completed',
    PU: 'Picked Up',
    S: "S",
    C: "Cancelled",
  };

  const sections = history?.map((item) => ({
    title: statusTitles[item?.order_status] || 'Unknown Status',
    details: item.details,
    time: item.created_at ? moment(item.created_at).format('MMMM Do YYYY, h:mm:ss a') : null,
    showRSA: item?.order_status !== 'CNF'
  }));

  const [activeKey, setActiveKey] = useState("0");
  
  const handleAccordionToggle = (key) => {
    setActiveKey(activeKey === key ? null : key);
  };

  return (
    <div className={styles.accordionContainer}>
      <div className={styles.header}>
        <div className={styles.status}>Order Status</div>
      </div>

      <Accordion activeKey={activeKey} className={styles.accordion}>
      
       {sections.map((section, index) => (
          <Accordion.Item eventKey={index.toString()} key={index} className={styles.accordionItem}>
            <Accordion.Header onClick={() => handleAccordionToggle(index.toString())} className={styles.accordionHeader}>
              <span>{section.title}</span>
              <span className={styles.icon} style={{ marginLeft: '8px', color: 'white' }}>
                {activeKey === index.toString() ? '▲' : '▼'}
              </span>
            </Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              {section.showRSA && rsa?.driverName && (
                <p><strong>RSA:</strong> {rsa.driverName}</p>
              )}
              {section.time && <p> {section.time}</p>}

            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default BookingDetailsAccordion;
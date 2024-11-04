import React, { useState } from 'react';
import { Accordion } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './bookingdetails.module.css';

const BookingDetailsAccordion = () => {
  const sections = [
    { title: 'Assigned', content: 'Details for Assigned' },
    { title: 'Confirmed', content: 'Details for Confirmed' },
    { title: 'POD Reached at Location', content: 'Details for POD Reached' },
    { title: 'Charging Started', content: 'Details for Charging Started' },
    { title: 'Charging Completed', content: 'Details for Charging Completed' },
    { title: 'POD Picked Up', content: 'Details for POD Picked Up' }
  ];

  const [activeKey, setActiveKey] = useState(null);

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
              {/* Custom Icon Logic */}
              <span className={styles.icon} style={{ marginLeft: '8px', color: 'white' }}>
                {activeKey === index.toString() ? '▲' : '▼'}
              </span>
            </Accordion.Header>
            <Accordion.Body className={styles.accordionBody}>
              {section.content}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  );
};

export default BookingDetailsAccordion;

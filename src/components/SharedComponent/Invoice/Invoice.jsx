import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import styles from './invoice.module.css';
import logo from '../../../assets/images/Logo.svg';
import html2pdf from 'html2pdf.js';
import Download from '../../../assets/images/Download.svg'

const Invoice = ({ title, service, details }) => {
    const handleDownload = () => {
        const invoiceElement = document.getElementById('invoiceToDownload');
        const options = {
            margin:       0.5,
            filename:     'Invoice.pdf',
            image:        { type: 'jpeg', quality: 0.98 },
            html2canvas:  { scale: 2 },
            jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(options).from(invoiceElement).save();
    };
    return (
        <div className={styles.invoiceMainContainer}>
            <div className={styles.invoiceSection} >
                <div className={styles.invoiceDownloadSection}>
                    <div className={styles.invoiceHeading}>{title}</div>
                    <div className={styles.downloadButton} onClick={handleDownload}>
                        <img src={Download} alt="Download" />
                        <span>Download</span></div>
                </div>
                <div className={styles.container} id="invoiceToDownload">
                    <table className={styles.table} style={{ width: "100%" }}>
                        <tbody>
                            <tr>
                                <td colSpan="2">
                                    <table>
                                        <tr>
                                            <td className={styles.logoSection}>
                                                <img src={logo} alt="company logo" className={styles.logoImage} />
                                                <p>D55-PBU</p>
                                                <p>DUBAI PRODUCTION CITY</p>
                                                <p>Dubai-United Arab Emirates</p>
                                                <p>+971 54279 6424</p>
                                               
                                            </td>
                                            <td className={styles.invoiceTitle}>
                                                <p>INVOICE</p>
                                                <div className={styles.bookingId}>
                                                    <p>Booking ID: {details?.booking_id || details?.request_id} </p>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <table style={{ width: '100%', marginTop: '10px' }}>
                                        <tr>
                                            <td className={styles.billTo}>
                                                <p>Bill To:</p>
                                                <p className={styles.billToName}>{details?.user_name}</p>
                                            </td>
                                            <td className={styles.invoiceDetails}>
                                                <p>
                                                    Invoice Date: {moment(details?.created_at).format('DD MMM YYYY')}
                                                </p>
                                                <p>
                                                    Invoice No.: {details?.invoice_id}
                                                </p>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2">
                                    <table style={{ width: '100%', borderSpacing: 0, marginTop:"16px" }}>
                                        <thead>
                                            <tr className={styles.serviceHeader}>
                                                <th>Item Name</th>
                                                <th>Units</th>
                                                <th className={styles.amountRightAlign}>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className={styles.serviceItem}>
                                                <td>{service}</td>
                                                <td>5 Unit</td>
                                                <td className={styles.amountRightAlign}>{details?.currency?.toUpperCase() || 'AED'} {details?.price}</td>
                                            </tr>
                                            {/* <tr className={styles.serviceItem}>
                                                <td>Portable Charger Service</td>
                                                <td>5 Unit</td>
                                                <td className={styles.amountRightAlign}>250</td>
                                            </tr>
                                            <tr className={styles.serviceItem}>
                                                <td>Portable Charger Service</td>
                                                <td>5 Unit</td>
                                                <td className={styles.amountRightAlign}>250</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                            <tr className={styles.serviceItem}>
                                <td style={{ width: '60%', textAlign: 'left' }}>
                                    <p className={styles.totalAmountLabel}>VAT:</p>
                                </td>
                                <td className={styles.amountRightAlign}>
                                    <p className={styles.totalAmountValue}>
                                        AED 0.00
                                    </p>
                                </td>
                            </tr>
                            <tr className={styles.serviceItem}>
                                <td style={{ width: '60%', textAlign: 'left' }}>
                                    <p className={styles.totalAmountLabel}>Total Amount:</p>
                                </td>
                                <td className={styles.amountRightAlign}>
                                    <p className={styles.totalAmountValue}>
                                        AED 255555
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Invoice;

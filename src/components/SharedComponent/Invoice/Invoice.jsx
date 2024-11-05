import React from 'react';
import styles from './invoice.module.css';
import logo from '../../../assets/images/Logo.svg';
import html2pdf from 'html2pdf.js';
import Download from '../../../assets/images/Download.svg'
const Invoice = ({ result }) => {
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
                    <div className={styles.invoiceHeading}>Portable Charger Invoice Details</div>
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
                                                    <p>Booking ID: Booki147852 </p>
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
                                                <p className={styles.billToName}>Shivanshi Tripathi</p>
                                            </td>
                                            <td className={styles.invoiceDetails}>
                                                <p>
                                                    Invoice Date: {'12/12/2024 '}
                                                </p>
                                                <p>
                                                    Invoice No.: INVOICE258963
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
                                                <td>Portable Charger Service</td>
                                                <td>5 Unit</td>
                                                <td className={styles.amountRightAlign}>250</td>
                                            </tr>
                                            <tr className={styles.serviceItem}>
                                                <td>Portable Charger Service</td>
                                                <td>5 Unit</td>
                                                <td className={styles.amountRightAlign}>250</td>
                                            </tr>
                                            <tr className={styles.serviceItem}>
                                                <td>Portable Charger Service</td>
                                                <td>5 Unit</td>
                                                <td className={styles.amountRightAlign}>250</td>
                                            </tr>
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
                                        125222 USD
                                    </p>
                                </td>
                            </tr>
                            <tr className={styles.serviceItem}>
                                <td style={{ width: '60%', textAlign: 'left' }}>
                                    <p className={styles.totalAmountLabel}>Total Amount:</p>
                                </td>
                                <td className={styles.amountRightAlign}>
                                    <p className={styles.totalAmountValue}>
                                        255555 USD
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

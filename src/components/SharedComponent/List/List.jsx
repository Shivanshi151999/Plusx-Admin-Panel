import React, { useState } from 'react';
import styles from './list.module.css';
import Edit from '../../../assets/images/Pen.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import Delete from '../../../assets/images/Delete.svg';
import View from '../../../assets/images/ViewEye.svg'
import { useNavigate } from 'react-router-dom';


const List = ({tableHeaders, listData, keyMapping, pageHeading, onDeleteSlot}) => {

    const navigate = useNavigate()

    const handleSignupDetails = (id) => {
        navigate(`/rider-details/${id}`)
    }

    const handleBookingDetails = (id) => {
        navigate(`/portable-charger/charger-booking-details/${id}`)
    }

    const handlePDBookingDetails = (id) => {
        navigate(`/pick-and-drop/booking-details/${id}`)
    }
    
    const handleChargerInstallationDetails = (id) => {
        navigate(`/charger-installation-details/${id}`)
    }

    const handleChargerEditTimeSlot = (id) => {
        navigate(`/portable-charger/edit-time-slot/${id}`)
    }

    const handleChargerDetails = (id) => {
        navigate(`/edit-charger/${id}`)
    }

    const handlePickDropEditTimeSlot = (id) => {
        navigate(`/pick-and-drop/edit-time-slot/${id}`)
    }
    const handleRsaDetails = (id) => {
        navigate(`/edit-emergency-team/${id}`)
    }
    const viewRsaDetails = (id) => {
        navigate(`/emergency-team-details/${id}`)
    }
    
    const handlePublicChargerStationDetails = (id) => {
        navigate(`/public-charger-station-details/${id}`)
    }

    const handleEditChargerDetails = (id) => {
        navigate(`/edit-charger-station/${id}`)
    }

    return (
        <div className={styles.containerCharger}>
            
            <table className={styles.table}>
                <thead>
                <tr>
                        {tableHeaders?.map((header, i) => (
                            <th key={i}>{header}</th> 
                        ))}
                    </tr>
                    
                </thead>
                <tbody>
                    {listData.map((data, index) => (
                        <tr key={index}>
                           {keyMapping.map((keyObj, keyIndex) => (
                                <td key={keyIndex}>
                                {keyObj.format 
                                    ? keyObj.relatedKeys 
                                        ? keyObj.format(data, keyObj.key, keyObj.relatedKeys) 
                                        : keyObj.format(data[keyObj.key]) 
                                    : data[keyObj.key]
                                }
                                </td>
                            ))}
                            <td>
                                <div className={styles.editContent}>

                                {pageHeading === 'Emergency Team List' && (
                                        <>
                                         <img src={View} alt="view" onClick={() => viewRsaDetails(data.rsa_id)}/>
                                            <img src={Edit} alt='edit' onClick={() => handleRsaDetails(data.rsa_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.rsa_id)}/>
                                        </>
                                    )}

                                {pageHeading === 'Charger Booking List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleBookingDetails(data.booking_id)}/>
                                            {/* <img src={Cancel} alt='cancel' /> */}
                                        </>
                                    )}
                                    {pageHeading === 'Portable Charger List' && (
                                        <>
                                            <img src={Edit} alt='edit' onClick={() => handleChargerDetails(data.charger_id)} />
                                            <img src={Cancel} alt='cancel' onClick={() => onDeleteSlot(data.charger_id)}/>
                                        </>
                                    )}
                                    {pageHeading === 'Portable Charger Invoice List' && (
                                        <img src={View} alt="view" />
                                    )}
                                    {pageHeading === 'Portable Charger Slot List' && (
                                        <>
                                            <img src={Edit} alt='edit' 
                                            onClick={() => handleChargerEditTimeSlot(data.slot_id)}
                                            />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.slot_id)}/>
                                        </>
                                    )}
                                    {pageHeading === 'App Signup List' && (
                                        <>
                                            <img src={View} alt="view" 
                                            onClick={() => handleSignupDetails(data.rider_id)}
                                            />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.rider_id)}/>
                                        </>
                                    )}

                                    {pageHeading === 'Pick & Drop Booking List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handlePDBookingDetails(data.request_id)} />
                                            {/* <img src={Cancel} alt='cancel' /> */}
                                        </>
                                    )}
                                   {pageHeading === 'Pick & Drop Invoice List' && (
                                        <>
                                            <img src={View} alt="view" />
                                        </>
                                    )}
                                    {pageHeading === 'Pick & Drop Time Slot List' && (
                                        <>
                                            <img src={Edit} alt='edit' onClick={() => handlePickDropEditTimeSlot(data.slot_id)}/>
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.slot_id)}/>
                                        </>
                                    )}


                                    {pageHeading === 'Public Chargers List' && (
                                        <>
                                         <img src={View} alt="view" onClick={() => handlePublicChargerStationDetails(data.station_id)}/>
                                            <img src={Edit} alt='edit' onClick={() => handleEditChargerDetails(data.station_id)}/>
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                   {pageHeading === 'Charger Installation List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleChargerInstallationDetails(data.request_id)}/>
                                        </>
                                    )}

                                    {pageHeading === 'Shop List' && (
                                        <>
                                         <img src={View} alt="view" />
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Shop Service List' && (
                                        <>
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Shop Brand List' && (
                                        <>
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}


                                     {pageHeading === 'Club List' && (
                                        <>
                                         <img src={View} alt="view" />
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Electric Cars Leasing List' && (
                                        <>
                                         <img src={View} alt="view"/>
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Electric Bikes Leasing List' && (
                                        <>
                                         <img src={View} alt="view"/>
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}
                                    
                                {/* <img src={View} alt="view" />
                                    <img src={Edit} alt='edit' />
                                    <img src={Cancel} alt='cancel' />
                                    <img src={Delete} alt='delete' /> */}
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default List;

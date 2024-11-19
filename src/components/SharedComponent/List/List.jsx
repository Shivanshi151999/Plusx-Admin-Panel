import React, { useState } from 'react';
import styles from './list.module.css';
import Edit from '../../../assets/images/Pen.svg';
import Cancel from '../../../assets/images/Cancel.svg';
import Delete from '../../../assets/images/Delete.svg';
import View from '../../../assets/images/ViewEye.svg'
import AddDriver from '../../../assets/images/AddDriver.svg';
import { useNavigate } from 'react-router-dom';


const List = ({ list, tableHeaders, listData, keyMapping, pageHeading, onDeleteSlot, onBookingConfirm }) => {

    const navigate = useNavigate()

    const handleSignupDetails = (id) => navigate(`/rider-details/${id}`)

    const handleBookingDetails = (id) => navigate(`/portable-charger/charger-booking-details/${id}`)

    const handlePDBookingDetails = (id) => navigate(`/pick-and-drop/booking-details/${id}`)

    const handleChargerInstallationDetails = (id) => navigate(`/charger-installation-details/${id}`)

    const handleChargerEditTimeSlot = (id) => navigate(`/portable-charger/edit-time-slot/${id}`)

    const handleChargerDetails = (id) => navigate(`/edit-charger/${id}`)

    const handlePickDropEditTimeSlot = (id) => navigate(`/pick-and-drop/edit-time-slot/${id}`)

    const handleRsaDetails = (id) => navigate(`/edit-emergency-team/${id}`)

    const viewRsaDetails = (id) => navigate(`/emergency-team-details/${id}`)


    const handlePublicChargerStationDetails = (id) => navigate(`/public-charger-station-details/${id}`)

    const handleEditChargerDetails = (id) => navigate(`/edit-charger-station/${id}`)

    const handlePortableInvoice = (id) => navigate(`/invoice/${id}`)

    const handlePickAndDropInvoiceDetails = (id) => navigate(`/pick-and-drop/invoice-details/${id}`)
    //AddPodList
    const handleEditPodList = (id) => navigate(`/editpod-form`)
    const handleAddPodDetails = (id) => navigate(`/addpod-details`)

    //EvGuide
    const handleEvGuideDetails = (id) => navigate(`/ev-guide-details/${id}`)
    const handleEvGuideEdit = (id) => navigate(`/edit-ev-guide/${id}`)

    //ElectricCar
    const handleEditElectricCar = (id) => navigate(`/edit-electric-car/${id}`)
    const handleElectricCarDetails = (id) => navigate(`/electric-car-details/${id}`)

    //ElectricBike
    const handleEditElectricBike = (id) => navigate(`/edit-electric-bike/${id}`)
    const handleElectricBikeDetails = (id) => navigate(`/electric-bike-details/${id}`)

    //EvRoadAssistance
    const handleRoadAssistanceBookingDetails = (id) => navigate(`/ev-road-assistance/booking-details/${id}`)
    const handleRoadAssistanceInvoiceDetails = (id) => navigate(`/ev-road-assistance/invoice-details/${id}`)
    // 

    //EvRoadAssistance
    const handleRiderClubEdit = (id) => navigate(`/edit-club/${id}`)
    const handleRiderClubDetails = (id) => navigate(`/club-details/${id}`)

    //DiscussionBoard
    const handleBoardDetails = (id) => navigate(`/discussion-board-details/${id}`)

    //EvInsurance
    const handleInsuranceDetails = (id) => navigate(`/ev-insurance-details/${id}`)

    //EvPreSale
    const handlePreSaleBookingDetails = (id) => navigate(`/ev-pre-sales-testing/pre-sales-details/${id}`)

    //EvBuySell
    const handleBuySellDetails = (id) => navigate(`/ev-buy-sell-details/${id}`)

    //Subscription
    const handleSubscriptionDetails = (id) => navigate(`/subscription-details/${id}`)

    //Coupon
    const handleCouponEdit = (id) => navigate(`/edit-coupon/${id}`)

    //Coupon
    const handleOfferEdit = (id) => navigate(`/edit-offer/${id}`)

    //Shop
    const handleShopDetails = (id) => navigate(`/ev-specialized/shop-details/${id}`)
<<<<<<< Updated upstream
    const handleShopEditDetails = (id) => navigate(`/ev-specialized/edit-shop/${id}`)
    
=======

>>>>>>> Stashed changes
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
                    {
                        list === 'time slot' ?
                            <tr>
                                <span className={styles.listSpan}>Date:12-12-2024</span>
                            </tr> : ''
                    }

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
                                            <img src={View} alt="view" onClick={() => viewRsaDetails(data.rsa_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleRsaDetails(data.rsa_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.rsa_id)} />
                                        </>
                                    )}

                                    {pageHeading === 'Charger Booking List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleBookingDetails(data.booking_id)} />
                                            {/* <img src={Cancel} alt='cancel' /> */}
                                        </>
                                    )}
                                    {pageHeading === 'Portable Charger List' && (
                                        <>
                                            <img src={Edit} alt='edit' onClick={() => handleChargerDetails(data.charger_id)} />
                                            <img src={Cancel} alt='cancel' onClick={() => onDeleteSlot(data.charger_id)} />
                                        </>
                                    )}
                                    {pageHeading === 'Portable Charger Invoice List' && (
                                        <img src={View} alt="view" onClick={() => handlePortableInvoice(data.invoice_id)} />
                                    )}
                                    {pageHeading === 'Portable Charger Slot List' && (
                                        <>
                                            <img src={Edit} alt='edit'
                                                onClick={() => handleChargerEditTimeSlot(data.slot_id)}
                                            />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.slot_id)} />
                                        </>
                                    )}
                                    {pageHeading === 'App Signup List' && (
                                        <>
                                            <img src={View} alt="view"
                                                onClick={() => handleSignupDetails(data.rider_id)}
                                            />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.rider_id)} />
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
                                            <img src={View} alt="view" onClick={() => handlePickAndDropInvoiceDetails(data.invoice_id)} />
                                        </>
                                    )}
                                    {pageHeading === 'Pick & Drop Time Slot List' && (
                                        <>
                                            <img src={Edit} alt='edit' onClick={() => handlePickDropEditTimeSlot(data.slot_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.slot_id)} />
                                        </>
                                    )}
                                    {pageHeading === 'Add POD List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleEditPodList(data.slot_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleAddPodDetails(data.slot_id)} />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Public Chargers List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handlePublicChargerStationDetails(data.station_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleEditChargerDetails(data.station_id)} />
                                            <img src={Delete} alt='delete' />
                                        </>
                                    )}

                                    {pageHeading === 'Charger Installation List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleChargerInstallationDetails(data.request_id)} />
                                        </>
                                    )}

                                    {pageHeading === 'Shop List' && (
                                        <>
<<<<<<< Updated upstream
                                         <img src={View} alt="view" onClick={() => handleShopDetails(data.shop_id)}/>
                                            <img src={Edit} alt='edit' onClick={() => handleShopEditDetails(data.shop_id)}/>
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.shop_id)} />
=======
                                            <img src={View} alt="view" onClick={() => handleShopDetails(data.shop_id)} />
                                            <img src={Edit} alt='edit' />
                                            <img src={Delete} alt='delete' />
>>>>>>> Stashed changes
                                        </>
                                    )}

                                    {pageHeading === 'EV Pre-Sale Testing Booking List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handlePreSaleBookingDetails(data.booking_id)} />
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
                                            <img src={View} alt="view" onClick={() => handleRiderClubDetails(data.club_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleRiderClubEdit(data.club_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.club_id)} />
                                        </>
                                    )}

                                    {pageHeading === 'Electric Cars Leasing List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleElectricCarDetails(data.rental_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleEditElectricCar(data.rental_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.rental_id)} />
                                        </>
                                    )}

                                    {pageHeading === 'Electric Bikes Leasing List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleElectricBikeDetails(data.rental_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleEditElectricBike(data.rental_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.rental_id)} />
                                        </>
                                    )}

                                    {/* EV Guide */}
                                    {pageHeading === 'EV Guide List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleEvGuideDetails(data.vehicle_id)} />
                                            <img src={Edit} alt='edit' onClick={() => handleEvGuideEdit(data.vehicle_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.vehicle_id)} />
                                        </>
                                    )}

                                    {/* Ev Road Assitance */}
                                    {pageHeading === 'Ev Road Assitance Booking List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleRoadAssistanceBookingDetails(data.request_id)} />
                                            {/* <img src={AddDriver} alt='confirm' /> */}
                                            {data.order_status !== 'C' && (
                                                <img src={AddDriver} alt='confirm' onClick={() => onBookingConfirm(data.request_id)} />
                                            )}
                                            {data.order_status !== 'C' && (
                                                <img src={Cancel} alt='cancel' />
                                            )}
                                        </>
                                    )}
                                    {pageHeading === 'Road Assistance Invoice List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleRoadAssistanceInvoiceDetails(data.invoice_id)} />
                                        </>
                                    )}

                                    {pageHeading === 'Board List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleBoardDetails(data.board_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.board_id)} />
                                        </>
                                    )}

                                    {pageHeading === 'Insurance List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleInsuranceDetails(data.insurance_id)} />
                                            {/* <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.board_id)} /> */}
                                        </>
                                    )}

                                    {pageHeading === 'Buy Sell List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleBuySellDetails(data.sell_id)} />
                                            {/* <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.board_id)} /> */}
                                        </>
                                    )}

                                    {pageHeading === 'Subscription List' && (
                                        <>
                                            <img src={View} alt="view" onClick={() => handleSubscriptionDetails(data.subscription_id)} />
                                            {/* <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.board_id)} /> */}
                                        </>
                                    )}

                                    {pageHeading === 'Coupon List' && (
                                        <>
                                            <img src={Edit} alt='edit' onClick={() => handleCouponEdit(data.id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.coupan_code)} />
                                        </>
                                    )}

                                    {pageHeading === 'Offer List' && (
                                        <>
                                            <img src={Edit} alt='edit' onClick={() => handleOfferEdit(data.offer_id)} />
                                            <img src={Delete} alt='delete' onClick={() => onDeleteSlot(data.offer_id)} />
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

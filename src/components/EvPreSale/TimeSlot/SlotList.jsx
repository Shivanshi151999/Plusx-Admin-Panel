import React, { useEffect, useState } from 'react';
import Delete from '../../../assets/images/Delete.svg';
import Edit from '../../../assets/images/Pen.svg';
import styles from '../../SharedComponent/List/list.module.css';
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'
import { getRequestWithToken, postRequestWithToken } from '../../../api/Requests';
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const EvPreSaleSlotList = () => {
    const userDetails = JSON.parse(sessionStorage.getItem('userDetails'));
    const navigate = useNavigate()
    const [timeSlotList, setTimeSlotList] = useState([])
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalCount, setTotalCount] = useState(1)
    const [refresh, setRefresh] = useState(false)
    const [filters, setFilters] = useState({});

    const searchTerm = [
        {
            label: 'search',
            name: 'search_text',
            type: 'text'
        }
    ]

    const addButtonProps = {
        heading: "Add Slot",
        link: "/ev-pre-sales-testing/add-time-slot"
    };

    const groupBySlotDate = (slots) => {
        const grouped = slots.reduce((acc, slot) => {
            const date = slot.slot_date;
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(slot);
            return acc;
        }, {});

        return Object.entries(grouped)
            .sort(([dateA], [dateB]) => new Date(dateB) - new Date(dateA))
            .map(([slot_date, slots]) => ({ slot_date, slots }));
    };

    const groupedData = groupBySlotDate(timeSlotList);
    console.log(groupedData);

    const fetchList = (page, appliedFilters = {}) => {
        const obj = {
            userId: userDetails?.user_id,
            email: userDetails?.email,
            page_no: page,
            ...appliedFilters,
        }

        postRequestWithToken('ev-pre-sale-time-slot-list', obj, async (response) => {
            if (response.code === 200) {
                // setTimeSlotList(response?.data)
                const updatedData = response.data.map((item) => ({
                    ...item,
                    remaining_booking: (item.booking_limit || 0) - (item.slot_booking_count || 0),
                }));
                setTimeSlotList(updatedData)
                setTotalPages(response?.total_page || 1);
                setTotalCount(response?.total || 1)
            } else {
                // toast(response.message, {type:'error'})
                console.log('error in ev-pre-sale-time-slot-list api', response);
            }
        })
    }

    useEffect(() => {
        if (!userDetails || !userDetails.access_token) {
            navigate('/login');
            return;
        }
        fetchList(currentPage, filters);
    }, [currentPage, filters, refresh]);

    const fetchFilteredData = (newFilters = {}) => {
        setFilters(newFilters);
        setCurrentPage(1);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleDeleteSlot = (slotId) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this slot?");
        if (confirmDelete) {
            const obj = {
                userId: userDetails?.user_id,
                email: userDetails?.email,
                slot_id: slotId
            };
            postRequestWithToken('ev-pre-sale-delete-time-slot-list', obj, async (response) => {
                if (response.code === 200) {
                    setRefresh(prev => !prev);
                    toast(response.message, { type: "success" });
                } else {
                    toast(response.message, { type: 'error' });
                    console.log('error in ev-pre-sale-delete-time-slot-listt api', response);
                }
            });
        }
    };

    const handlePickDropEditTimeSlot = (id) => navigate(`/ev-pre-sales-testing/edit-time-slot/${id}`)

    return (
        <div className='main-container'>
            <ToastContainer />
            <SubHeader heading="Time Slot List"
                addButtonProps={addButtonProps}
                filterValues={filters}
                fetchFilteredData={fetchFilteredData}
                searchTerm={searchTerm}
                count = {totalCount}
            />

            {timeSlotList.length === 0 ? (
                <div className='errorContainer'>No data available</div>
            ) : (
                <div className={styles.containerCharger}>

                    <table className={styles.table}>
                        <thead>
                        <tr>
                                <th>Slot ID</th>
                                <th>Timing</th>
                                <th>Booking Limit</th>
                                <th>Total Booking</th>
                                <th>Remaining Booking</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        {/* <tbody> */}

                        {groupedData.map((group, index) => (
                            <React.Fragment key={index} className={styles.groupContainer}>
                                <tr >
                                    <td className={styles.listSpan}>Date: {group.slot_date}</td>
                                </tr>
                                <tbody className={styles.timeSlotGroup} >
                                    {group.slots.map((slot, slotIndex) => (
                                        <tr key={slotIndex} style={{ padding: "10px" }} >
                                            <td>{slot.slot_id}</td>
                                            <td>
                                                {slot.timing ? (() => {
                                                    const [startTime, endTime] = slot.timing.split(' - ');
                                                    const formattedStart = moment(startTime, 'HH:mm:ss').format('HH:mm');
                                                    const formattedEnd = moment(endTime, 'HH:mm:ss').format('HH:mm');
                                                    return `${formattedStart} - ${formattedEnd}`;
                                                })() : 'N/A'}
                                            </td>
                                            <td>{slot.booking_limit || '0'}</td>
                                            <td>{slot.slot_booking_count || '0'}</td>
                                            <td>{slot.remaining_booking || '0'}</td>
                                            <td>{slot.status === 1 ? "Active" : "Inactive"}</td>
                                            <td>
                                                <div className={styles.editContent}>
                                                    <img src={Edit} alt='edit' onClick={() => handlePickDropEditTimeSlot(slot.slot_id)} />
                                                    <img src={Delete} alt='delete' onClick={() => handleDeleteSlot(slot.slot_id)} />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </React.Fragment>
                        ))}

                        {/* </tbody> */}
                    </table>

                </div>
            )}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default EvPreSaleSlotList;

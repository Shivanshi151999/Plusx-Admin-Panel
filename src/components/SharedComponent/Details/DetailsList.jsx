import React from 'react';
import styles from './details.module.css'

const DetailsList = ({addressList}) => {
  const addresses = [
    {
      buildingName: "RIOT Experience Center",
      streetName: "Production City",
      areaName: "Production City",
      unitNo: "0000",
      nickName: "Name Here",
      emirates: "Dubai",
    },
    {
      buildingName: "RIOT Experience Center",
      streetName: "Production City",
      areaName: "Production City",
      unitNo: "0000",
      nickName: "Name Here",
      emirates: "Dubai",
    },
  ];

  return (
    <div className={styles.addressListContainer}>
      <span className={styles.sectionTitle}>Address List</span>
      <table className={`table ${styles.customTable}`}>
        <thead>
          <tr>
            <th>Building Name</th>
            <th>Street Name</th>
            <th>Area Name</th>
            <th>Unit No</th>
            <th>Nick Name</th>
            <th>Emirates</th>
          </tr>
        </thead>
        <tbody>
          {addressList?.map((address, index) => (
            <tr key={index}>
              <td>{address.building_name}</td>
              <td>{address.street}</td>
              <td>{address.area}</td>
              <td>{address.unit_no}</td>
              <td>{address.nick_name}</td>
              <td>{address.emirate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsList;

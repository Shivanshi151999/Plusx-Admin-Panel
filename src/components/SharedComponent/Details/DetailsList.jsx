import React from 'react';
import styles from './details.module.css'

const DetailsList = () => {
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
          {addresses.map((address, index) => (
            <tr key={index}>
              <td>{address.buildingName}</td>
              <td>{address.streetName}</td>
              <td>{address.areaName}</td>
              <td>{address.unitNo}</td>
              <td>{address.nickName}</td>
              <td>{address.emirates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsList;

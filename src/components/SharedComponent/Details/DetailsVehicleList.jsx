import React from 'react';
import styles from './details.module.css'

const DetailsVehicleList = () => {
  const addresses = [
    {
     vehicletype: "RIOT Experience Center",
      vehicleno: "Production City",
      vehiclecode: "Production City",
      yearmanufacture: "0000",
      vehiclemodal: "Name Here",
      vehiclemake: "Dubai",
      leasedfrom: "Production City",
      ownertype: "Production City",
      owner: "0000",
      vehiclespecification: "Name Here",
      emirates: "Dubai",
    },
    {
        vehicletype: "RIOT Experience Center",
         vehicleno: "Production City",
         vehiclecode: "Production City",
         yearmanufacture: "0000",
         vehiclemodal: "Name Here",
         vehiclemake: "Dubai",
         leasedfrom: "Production City",
         ownertype: "Production City",
         owner: "0000",
         vehiclespecification: "Name Here",
         emirates: "Dubai",
       },
  ];

  return (
    <div className={styles.addressListContainer}>
      <span className={styles.sectionTitle}>Vehicle List</span>
      <table className={`table ${styles.customTable}`}>
        <thead>
          <tr>
            <th>Vehicle Type</th>
            <th>Vehicle No.</th>
            <th>Vehicle Code</th>
            <th>Year Manufacture</th>
            <th>Vehicle Modal</th>
            <th>Vehicle Make</th>
            <th>Leased From</th>
            <th>Owner Type</th>
            <th>Owner</th>
            <th>Vehicle Specification</th>
            <th>Emirates</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address, index) => (
            <tr key={index}>
              <td>{address.vehicletype}</td>
              <td>{address.vehicleno}</td>
              <td>{address.vehiclecode}</td>
              <td>{address.yearmanufacture}</td>
              <td>{address.vehiclemodal}</td>
              <td>{address.vehiclemake}</td>
              <td>{address.leasedfrom}</td>
              <td>{address.ownertype}</td>
              <td>{address.owner}</td>
              <td>{address.vehiclespecification}</td>
              <td>{address.emirates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsVehicleList;
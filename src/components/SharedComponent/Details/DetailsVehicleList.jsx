import React from 'react';
import styles from './details.module.css'

const DetailsVehicleList = ({vehicleList}) => {
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
          {vehicleList?.map((address, index) => (
            <tr key={index}>
              <td>{address.vehicle_type}</td>
              <td>{address.vehicle_number}</td>
              <td>{address.vehicle_code}</td>
              <td>{address.year_manufacture}</td>
              <td>{address.vehicle_model}</td>
              <td>{address.vehicle_make}</td>
              <td>{address.leased_from}</td>
              <td>{address.owner_type}</td>
              <td>{address.owner}</td>
              <td>{address.vehicle_specification}</td>
              <td>{address.emirates}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DetailsVehicleList;
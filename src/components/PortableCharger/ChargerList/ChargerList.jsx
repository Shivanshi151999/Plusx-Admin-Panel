import React, { useState } from 'react';
import List from '../../SharedComponent/List/List'
import SubHeader from '../../SharedComponent/SubHeader/SubHeader'
import Pagination from '../../SharedComponent/Pagination/Pagination'

const ChargerList = () => {
    return (
        <>
         <SubHeader/>
        <List />
           
        <Pagination />
        </>
    );
};

export default ChargerList;

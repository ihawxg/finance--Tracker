import React from "react";
import BasicDatePicker from './DatePicker';
import Categories from './CategoryPicker';
import styled from 'styled-components';
export default function Filters() {
    return(
        <FilterField>
            <FilterHeader>Filter by date/category:</FilterHeader>
            <BasicDatePicker label="From"/>
            <BasicDatePicker label="To"/>
            <Categories />
        </FilterField>
    );
}

const FilterField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: flex-start;
`;
const FilterHeader = styled.div`
    text-align: center;
    color : #707070;
    font-family: 'Roboto', sans-serif;
    font-weight: 600;
    letter-spacing: 1.3px;
`;
import React from "react";
import BasicDatePicker from './DatePicker';
import styled from 'styled-components';
export default function Filters() {
    return(
        <FilterField>
            <FilterHeader>Filter by date:</FilterHeader>
            <BasicDatePicker label="From"/>
            <BasicDatePicker label="To"/>
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
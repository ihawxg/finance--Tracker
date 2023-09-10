import React from "react";
import AddButtons from "./AddButtons";
import { Chart } from './Chart';
import{ PieChart } from './PieChart';
import styled from 'styled-components';
import Filters from './Filters';
export default function Home() {
    return (
        <>
            <UpperPageWrapper>
                <Chart />
                <AsideWrapper>
                    <AddButtons />
                    <Filters/>
                    <PieChart />
                </AsideWrapper>
            </UpperPageWrapper>
            {/* <TransactionHistoryWrapper>

            </TransactionHistoryWrapper> */}
        </>

    )
}
const HomePage = styled.div`
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
`
const UpperPageWrapper = styled.div`
    display : flex;
    width: 100%;
    flex-flow : row wrap;
    justify-content: space-between;


`;
// const TransactionHistoryWrapper = styled.div`
// `;
const AsideWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;
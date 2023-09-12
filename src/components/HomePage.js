import React from "react";
import AddButtons from "./AddButtons";
import { Chart } from './Chart';
import{ PieChart } from './PieChart';
import styled from 'styled-components';
import Filters from './Filters';
import EnhancedTable from './EntriesHistory';
import { ChartRangeFilter } from './chartFilters';
export default function Home() {
    return (
        <HomePage>
            <UpperPageWrapper>
                <Chart />
                <AsideWrapper>
                    <AddButtons />
                    <ChartRangeFilter />
                    <Filters/>
                    <PieChart />
                </AsideWrapper>
            </UpperPageWrapper>
            <TransactionHistoryWrapper>
                <EnhancedTable/>
            </TransactionHistoryWrapper>
        </HomePage>

    )
}
const HomePage = styled.div`
  margin: 10px;
`
const UpperPageWrapper = styled.div`
  display : flex;
  width: 100%;
  flex-flow : row wrap;
  justify-content: space-between;
  @media (max-width: 900px) {
    flex-direction : column;
    align-items: center;
  }
`;
const TransactionHistoryWrapper = styled.div`
  margin: 20px;
`;
const AsideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

`;
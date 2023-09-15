import React from "react";
import AddButtons from "./AddButtons";
import styled from 'styled-components';
import styles from './styles/total_box.module.css';
import TotalBox from "./TotalBox";

export default function Home() {
    return (
        <HomePage>
            <AddButtons/>
            <div className={styles.overAllContainer}>
                <div className={styles.containerBoxAll}>
                    <div className={styles.containerBoxTwo}>
                        <TotalBox name="balance"/>
                        <TotalBox name="transactions"/>               
                    </div>
                    <div className={styles.containerBoxTwo}>
                        <TotalBox name="incomes"/>
                        <TotalBox name="expenses"/>
                    </div>
                </div>
            </div>
        
        </HomePage>

    )
}
const HomePage = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
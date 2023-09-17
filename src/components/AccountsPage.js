import AddAccountBTN from "./AddAccountBTN";
import { useDispatch, useSelector } from "react-redux";

import { StyledPage, Heading } from "./HistoryPage";
import styled from 'styled-components';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import { AccountItem } from './AccountItem';
import { StyledButton } from "./BudgetsPage";

export default function AccountsPage(){
    const user = useSelector(state => state.userData.user);

    return (
        <StyledPage>
            <Heading> Accounts</Heading>
            <StyledButton>
                <AddAccountBTN />
            </StyledButton>
            
           
                {user.accounts.map( acc => {
                    return (
                      <AccountItem  
                            name={acc.name}
                            total={acc.total}
                            transactions={user.transactions.filter(transaction => transaction.account === acc.name)}
                         /> 
                    );
                })}
           
        </StyledPage>
    );
}
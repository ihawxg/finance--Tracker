import AddAccountBTN from "../AddAccountBTN";
import { useSelector } from "react-redux";

import { StyledPage, Heading } from "./HistoryPage";
import { AccountItem } from '../AccountItem';
import { StyledButton } from "./BudgetsPage";

export default function AccountsPage(){
    const user = useSelector(state => state.userData.user);
    const headerOpen = useSelector(state => state.headerStatus.isOpen);
    return (
        <StyledPage status={headerOpen}>
            <Heading> Accounts</Heading>
            <StyledButton>
                <AddAccountBTN isInHome={false} />
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
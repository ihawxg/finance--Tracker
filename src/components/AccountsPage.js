import styles from "./styles/pages.module.css"
import AddAccountBTN from "./AddAccountBTN";
import { useDispatch, useSelector } from "react-redux";
import { removeAccountAction } from "../redux/actions/userActions";
import { StyledPage, Heading } from "./HistoryPage";
import styled from 'styled-components';
import { toCurrency } from '../utils/util' 
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

export default function AccountsPage(){
    const user = useSelector(state => state.userData.user);
    const dispatch = useDispatch();

    const handleRemove = (prevName) => {
        dispatch(removeAccountAction(user.id, prevName, user.accounts));
    }

    return (
        <StyledPage>
            <Heading>Accounts</Heading>
            <AddAccountBTN />
           
                {user.accounts.map( acc => {
                    return (
                      <>
                        <h1>{acc.name} / { toCurrency(acc.total) }</h1>
                        <AddAccountBTN operation="edit" name={acc.name}/>
                        <button onClick={() => handleRemove(acc.name)}>Remove</button>
                      </>  
                    );
                })}
           
        </StyledPage>
    );
}
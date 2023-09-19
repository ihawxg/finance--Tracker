import React from 'react';
import { toCurrency } from '../utils/util' 
import styled from 'styled-components';
import { LineChart} from './charts/LineChart';
import { useSelector } from 'react-redux';

export const AccountItem = ({  name, total, transactions }) => {
    const currency = useSelector(state => state.userData.user.currency);

    return (
        <Account>
            <AccountName>
                { name } 
                <span className='fs-6 ms-1'> / { toCurrency(total, currency) } </span> 
            </AccountName>
            <LineChart data={transactions}/>
        </Account>
    )
}
const AccountName = styled.div`
    text-align: center;
    background: #ad5389;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #3c1053, #ad5389); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    border-radius: 20px;
    text-transform : uppercase;
    font-weight: 600;
    font-size: 20px;
    letter-spacing : 1px;
    color : #fff;
    margin-top: 20px;
`
export const Account = styled.div`
    max-width: 900px;
    margin: 30px auto;
    padding: 30px;
    border : 1px solid rgba(68, 18, 96, .1);
    border-radius: 20px;
    box-shadow: 2px 3px 10px rgba(68, 18, 96, .2);

    background: #D3CCE3;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #E9E4F0, #D3CCE3);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #E9E4F0, #D3CCE3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
   
   
`
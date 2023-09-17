import styles from "./styles/boxTest_module.css";
import styled, { keyframes } from "styled-components"; 
import React from "react";
import { BsWallet2, BsArrowUpRight, BsArrowDownRight, BsReceipt } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toCurrency } from "../utils/util";

export default function TotalBoxTest(props){
    const [counter, setCounter] = React.useState(0);
    const [toggle, setToggle] = React.useState(false);

    let details = 0;
    const user = useSelector(state => state.userData.user);
    let icon = <BsWallet2 />;
    let label;
    const currency = "BGN";

    switch(counter){
        case 0: 
            user.accounts.forEach(acc => details += Number(acc.total));
            icon = <BsWallet2 />;
            label = "Balance "
            break;
        case 1:
            user.accounts.forEach(acc => {
                acc.incomes.forEach(inc => details += Number(inc.amount));
            });
            icon = <BsArrowUpRight />;
            label = "Total Incomes "
            break;
        case 2:
            user.accounts.forEach(acc => {
                acc.expenses.forEach(exp => details += Number(exp.amount));
            });
            icon = <BsArrowDownRight />;
            label = "Total Expenses "
            break;
        case 3:
            user.accounts.forEach(acc => {
                details += acc.expenses.length + acc.incomes.length;
            });
            icon = <BsReceipt />;
            label = "Total Transactions "
            break;
    }

    const handleClick = () => {
        setToggle(prev => !prev);
        setTimeout( () => {
            setToggle(prev => !prev);
            setCounter(prev => prev + 1 > 3 ? 0 : prev + 1);
        }, 1000);
    }

    return (
        <Container onClick={handleClick}>
            <Label toggle={toggle}>{icon} {label} : {toCurrency(details)}</Label>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100px;
    position: relative;
    width: 520px;
    border-radius: 5px;
    display: flex;
    background: #ad5389;
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);
    background: linear-gradient(to right, #3c1053, #ad5389);
    text-transform : uppercase;
    letter-spacing: 1px;
    justify-content: center;
    align-items: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    position: relative;
`;

const Label = styled.h2`
    font-size: 25px;
    color: white;
    transform: ${props => props.toggle ? "translateX(0px)" : "translateX(-600px)" };
    animation: 1s ${props => props.toggle ? "slideOut" : "slideIn" } ease-in-out forwards;
    z-index: 10;
    position: relative;
`;
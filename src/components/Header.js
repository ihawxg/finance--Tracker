import { Link } from "react-router-dom";
import styles from "./styles/nav.module.css";
import styled from 'styled-components';

export default function Header(){
   
    return (
        <StyledHeader>
            <Logo src="logo.png" />
            <Link className={styles.btn} to="/home">Home</Link>
            <Link className={styles.btn} to="/about">About us</Link>
            <Link className={styles.btn} to="/login">Login</Link>
            <Link className={styles.btn} to="/register">Register</Link>
            <Balance><Italic>Current Balance:</Italic> BGN 0.00</Balance>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    position: fixed;
    z-index: 9999;
    top: 0; left: 0; right: 0;
    background-color: #fff;
    height: 60px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    gap: 20px;
    align-items: center;
    box-shadow: 0px 7px 25px rgba(0,0,0,.3);

    @media (max-width: 768px) {
        height: auto;
        flex-flow: column;
        align-items: flex-start;
    }
`;

const Balance = styled.div`
    font-family: 'Play', sans-serif;
    color: #707070;
    margin-left: auto;
    font-weight: 600;
    margin-right: 20px;
`

const Italic = styled.span`
    font-style: italic;
`
const Logo = styled.img`
    margin-left: 10px;
    width: 40px;
    height: 40px;

    @media (max-width: 768px) {
        cursor: pointer;
    }

`
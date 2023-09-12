import { Link } from "react-router-dom";
import styles from "./styles/nav.module.css";
import styled from 'styled-components';
import { useEffect, useState } from "react";

export default function Header(){
    useEffect(() => {
        window.addEventListener("resize", handleHeaderOnResize);
        return () => {
            window.removeEventListener("resize", handleHeaderOnResize);
        }
    }, []);
    const [navStatusOpen, setNavStatusOpen] = useState(false);
    const [screenSize, setScreenSize] = useState("large");
    const handleHeaderOnResize = () => {
        setScreenSize(window.innerWidth);
    }

    const handleClick = () => {
        if(screenSize < 768) {
            setNavStatusOpen(!navStatusOpen);
        }

    }
    return (
        <StyledHeader status={navStatusOpen}>
            <Logo src="logo.png" onClick={handleClick} />

            <Link className={styles.btn} to="/about">About us</Link>
            <Link className={styles.btn} to="/login">Login</Link>
            <Link className={styles.btn} to="/register">Register</Link>

            <Link className={styles.btn} to="/home">Home</Link>
            <Link className={styles.btn} to="/profile"> My Profile </Link>
            <Link className={styles.btn} to="/categories"> Categories </Link>
            <Link className={styles.btn} to="/budgets"> Budgets </Link>
            <Link className={styles.btn} to="/history"> History </Link>
            <Link className={styles.btn} to="/reports"> Reports </Link>
            <Link className={styles.btn} to="/accounts"> Accounts </Link>
            <Link className={styles.btn} to="/">Logout</Link>
        </StyledHeader>
    );
}

const StyledHeader = styled.header`
    position: fixed;
    z-index: 9999;
    top: 0; left: 0; 
    background-color: #fff;
    padding: 20px;
    height: 100vh;
    width: 200px;
    display: flex;
    flex-flow: column wrap;
    justify-content: flex-start;
    align-items: flex-start;
    
    box-shadow: 0px 7px 25px rgba(0,0,0,.1);
    border-bottom: 1px solid rgba(0,0,0,.1);

    @media (max-width: 768px) {
        overflow: hidden;
        transform: ${props => props.status ? `translate(0)` : `translate(-100%)`};
        flex-flow: column;
        align-items: flex-start;

    }
`;

const Logo = styled.img`
    margin-left: 20px;
    width: 40px;
    height: 40px;

    @media (max-width: 768px) {
        margin-top: 15px;
        cursor: pointer;
    }
`;
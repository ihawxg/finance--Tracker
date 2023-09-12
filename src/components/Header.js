import { Link } from "react-router-dom";
import styles from "./styles/nav.module.css";
import styled from 'styled-components';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import Form from './ContactForm';

export default function Header(){
    useEffect(() => {
        window.addEventListener("resize", handleHeaderOnResize);
        return () => {
            window.removeEventListener("resize", handleHeaderOnResize);
        }
    }, []);
    const [navStatusOpen, setNavStatusOpen] = useState(false);
    const [screenSize, setScreenSize] = useState("large");
    const [accountText, setAccountText] = useState(false);
    const handleHeaderOnResize = () => {
        setScreenSize(window.innerWidth);
        if(window.innerWidth < 768) {
            setAccountText(true);
        }
        else{
            setAccountText(false);
        }
    }

    const handleClick = () => {
        if(screenSize < 768) {
            setNavStatusOpen(!navStatusOpen);
        }

    }
    return (
        <StyledHeader status={navStatusOpen}>
            <Logo src="logo.png" onClick={handleClick} />
            <Link className={styles.btn} to="/home">Home</Link>
            <Link className={styles.btn} to="/about">About us</Link>
            <Link className={styles.btn} to="/login">Login</Link>
            <Link className={styles.btn} to="/register">Register</Link>
            <Balance><Italic>Balance:</Italic> BGN 0.00</Balance>
            <div className={styles.profileIcon}>
                <Link className={styles.btn} to="/profile">
                    {accountText ? "Account" : <AccountCircleIcon fontSize="large" />}
                </Link>
            </div>

            <Link className={styles.btn} to="/">Logout</Link>
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
  align-items: center;
  box-shadow: 0px 7px 25px rgba(0,0,0,.1);
  border-bottom: 1px solid rgba(0,0,0,.1);

  @media (max-width: 768px) {
    overflow: hidden;
    height: ${props => props.status ? "auto" : "60px"};
    flex-flow: column;
    align-items: flex-start;

  }
`;

const Balance = styled.div`
  font-family: 'Roboto', sans-serif;
  color: #606060;
  margin-left: auto;
  font-weight: 600;
  margin-right: 20px;
  transition : color .3s ease;
  &:hover {
    color: #176CC0;
  }

  @media (max-width: 768px) {
    position: absolute;
    right: 0; top: 20px;
  }
`;

const Italic = styled.span`
  font-style: italic;
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
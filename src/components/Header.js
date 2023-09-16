import { Link } from "react-router-dom";
import styles from "./styles/nav.module.css";
import styled from 'styled-components';
import { useEffect, useState } from "react";
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import CategoryIcon from '@mui/icons-material/Category';
import SavingsIcon from '@mui/icons-material/Savings';
import HistoryIcon from '@mui/icons-material/History';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions/userActions";

export default function Header(){
   
    const [navStatusOpen, setNavStatusOpen] = useState(false);
    const [screenSize, setScreenSize] = useState("large");
    const logged = useSelector(state => state.userData.logged);
    const dispatch = useDispatch();

    const handleClick = () => {
        setNavStatusOpen(!navStatusOpen);
    }
    return (
        <>
            
            <StyledHeader status={navStatusOpen}>
                { !logged &&
                    <>
                        <Link className={styles.btn} to="/login"><LoginIcon /><LinkName>Login</LinkName></Link>
                        <Link className={styles.btn} to="/register"><HowToRegIcon /><LinkName>Register</LinkName></Link>
                        <Link className={styles.btn} to="/about"><LightbulbIcon /><LinkName>About us</LinkName></Link>
                    </>
                }
                {
                    logged && 
                    <>
                        <Link className={styles.btn} to="/home"><HomeIcon /><LinkName>Home</LinkName></Link>
                        <Link className={styles.btn} to="/profile"><AssignmentIndIcon/><LinkName>My Profile</LinkName></Link>   
                        <Link className={styles.btn} to="/categories"><CategoryIcon/><LinkName>Categories</LinkName></Link>  
                        <Link className={styles.btn} to="/budgets"><SavingsIcon /><LinkName>Budgets</LinkName></Link>  
                        <Link className={styles.btn} to="/history"><HistoryIcon /><LinkName>History</LinkName></Link>  
                        <Link className={styles.btn} to="/reports"><AssessmentIcon /><LinkName>Reports</LinkName></Link>  
                        <Link className={styles.btn} to="/accounts"><AccountBalanceWalletIcon /><LinkName>Accounts</LinkName></Link>  
                        <Link className={styles.btn} onClick={() => dispatch(logoutAction)} to="/login"><LogoutIcon /><LinkName>Logout</LinkName></Link>
                    </>
                }
                <StyledIcon><Logo src="logo.png" onClick={handleClick} /></StyledIcon>
            </StyledHeader>
        </>
        
    );
}

const StyledHeader = styled.header`
    position: fixed;
    z-index: 9999;
    top: 0; left: 0; 
    background-color: rgb(8, 20, 91);
    height: 100vh;
    width: 200px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    box-shadow: 0px 1px 10px rgba(0,0,0,1);
    transform: ${props => props.status ? `translate(0)` : `translate(-101%)`};
    transition: transform .3s ease-in-out;
`;

const Logo = styled.img`
    width: 40px;
    height: 40px;
`;
const LinkName = styled.div`
    display: inline-flex;
    padding-left: 20px;
`
const StyledIcon = styled.div`
    position: absolute;
    top: 10px; right: -60px;
    padding:5px;
    cursor : pointer;
    border-radius: 5px;
`
import { Link, NavLink, useLocation } from "react-router-dom";
import styles from "./styles/nav.module.css";
import styled from 'styled-components';
import { useState } from "react";
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
import FlagIcon from '@mui/icons-material/Flag';
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/actions/userActions";
import { closeHeader, openHeader } from "../redux/actions/headerActions";
import logo from '../components/imgs/logo.jpg';

export default function Header(){
    const location = useLocation();
    const { pathname } = location;
    const page = pathname.split("/")[1];
    const [navStatusOpen, setNavStatusOpen] = useState(false);
    const logged = useSelector(state => state.userData.logged);
    const dispatch = useDispatch();

    const handleClick = () => {
        setNavStatusOpen(!navStatusOpen);
        dispatch(navStatusOpen ? closeHeader() : openHeader());
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
                        <Link className={page === "dashbord" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/dashbord"><HomeIcon /><LinkName>Dashbord</LinkName></Link>
                        <Link className={page === "profile" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/profile"><AssignmentIndIcon/><LinkName>My Profile</LinkName></Link>
                        <Link className={page === "accounts" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/accounts"><AccountBalanceWalletIcon /><LinkName>Accounts</LinkName></Link> 
                        <Link className={page === "reports" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/reports"><AssessmentIcon /><LinkName>Reports</LinkName></Link>  
                        <Link className={page === "budgets" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/budgets"><SavingsIcon /><LinkName>Budgets</LinkName></Link>  
                        <Link className={page === "goals" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/goals"><FlagIcon></FlagIcon><LinkName>Goals</LinkName></Link>
                        <Link className={page === "categories" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/categories"><CategoryIcon/><LinkName>Categories</LinkName></Link>  
                        <Link className={page === "history" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} to="/history"><HistoryIcon /><LinkName>History</LinkName></Link> 
                        <Link className={page === "logout" ? `${styles.active} ${styles.btn}` : `${styles.btn}`} onClick={() => dispatch(logoutAction)} to="/login"><LogoutIcon /><LinkName>Logout</LinkName></Link>
                        <StyledIcon><Logo src={logo} onClick={handleClick} /></StyledIcon>
                    </>
                }
                
            </StyledHeader>
        </>
        
    );
}

const StyledHeader = styled.header`
    position: fixed;
    z-index: 9999;
    top: 0; left: 0;
    background: #ad5389;
    background: -webkit-linear-gradient(to right, #3c1053, #ad5389);
    background: linear-gradient(to right, #3c1053, #ad5389);
    height: 100%;
    width: 160px;
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
    top: 5px; right: -55px;
    padding:5px;
    cursor : pointer;
    border-radius: 5px;
`
import { Routes, Route, Link } from "react-router-dom";
import AboutUsPage from "./AboutUsPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import styles from "./styles/nav.module.css"


export default function header(){
    return (
        <header>

            <Link className={styles.btn} to="/home">Home</Link>
            <Link className={styles.btn} to="/login">Login</Link>
            <Link className={styles.btn} to="/register">Register</Link>
            <Link className={styles.btn} to="/about">About us</Link>

            <Routes>
                {/* <Route path="/home" element={<HomePage />}/> */}
                <Route path="/login" element={<LoginPage />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/about" element={<AboutUsPage />}/>
                <Route path="/" element={<AboutUsPage />}/>
            </Routes>

        </header>
    );
}
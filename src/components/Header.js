import { Routes, Route, Link } from "react-router-dom";

export default function header(){
    return (
        <header>

            <Link to="/home">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            <Link to="/about">About us</Link>

            <Routes>
                {/* <Route path="/home" element={<HomePage/>}/> */}
                {/* <Route path="/login" element={<LoginPage/>}/> */}
                {/* <Route path="/register" element={<RegisterPage/>}/> */}
                {/* <Route path="/about" element={<AboutPage/>}/> */}
            </Routes>

        </header>
    );
}
import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutUsPage from "./components/AboutUsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

function App() {
  return (
    <>
        <Header />
        <Snackbar/>
        <Routes>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/about" element={<AboutUsPage />}/>
            <Route path="/" element={<AboutUsPage />}/>
            <Route path="/profile" element={<ProfilePage/>}/>
        </Routes>
    </>
  );
}

export default App;
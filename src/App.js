import Header from "./components/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/HomePage";
import AboutUsPage from "./components/AboutUsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ProfilePage from "./components/ProfilePage";
import Snackbar from './components/Snackbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import CategoriesPage from "./components/CategoriesPage";
import AccountsPage from "./components/AccountsPage";
import BudgetsPage from "./components/BudgetsPage";
import HistoryPage from "./components/HistoryPage";
import ReportsPage from "./components/ReportsPage";
import { useDispatch } from "react-redux";
import { loginAction, logoutAction } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const log = () => {
    if(sessionStorage.getItem("currentUser")){
      dispatch(loginAction(sessionStorage.getItem("currentUser")));
    }
    else if(localStorage.getItem("currentUser")){
      dispatch(loginAction(localStorage.getItem("currentUser")));
    }
    else{
      navigate("/login");
      dispatch(logoutAction); 
    }
  }

  window.addEventListener("load", log);

  return (
    <>
        <Header />
        <Snackbar />
        <Routes>
            <Route path="/login" element={<LoginPage />}/>
            <Route path="/register" element={<RegisterPage />}/>
            <Route path="/about" element={<AboutUsPage />}/>
            <Route path="/" element={<AboutUsPage />}/>
            <Route path="/home" element={<HomePage />}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/categories" element={<CategoriesPage/>}/>
            <Route path="/accounts" element={<AccountsPage/>}/>
            <Route path="/budgets" element={<BudgetsPage/>}/>
            <Route path="/history" element={<HistoryPage/>}/>
            <Route path="/reports" element={<ReportsPage/>}/>
        </Routes>
    </>
  );
}

export default App;
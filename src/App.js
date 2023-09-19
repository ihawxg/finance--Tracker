import Header from "./components/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import HomePage from "./components/pages/Dashbord";
import AboutUsPage from "./components/pages/AboutUsPage";
import LoginPage from "./components/pages/LoginPage";
import RegisterPage from "./components/pages/RegisterPage";
import ProfilePage from "./components/pages/ProfilePage";
import Snackbar from './components/Snackbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';
import CategoriesPage from "./components/pages/CategoriesPage";
import AccountsPage from "./components/pages/AccountsPage";
import BudgetsPage from "./components/pages/BudgetsPage";
import HistoryPage from "./components/pages/HistoryPage";
import ReportsPage from "./components/pages/ReportsPage";
import GoalsPage from "./components/pages/GoalsPage";
import { useDispatch, useSelector } from "react-redux";
import { loginAction, logoutAction } from "./redux/actions/userActions";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logged = useSelector(state => state.userData.logged);

  const log = () => {
    if(sessionStorage.getItem("currentUser")){
      dispatch(loginAction(sessionStorage.getItem("currentUser")));
      navigate("/home");
    }
    else if(localStorage.getItem("currentUser")){
      dispatch(loginAction(localStorage.getItem("currentUser")));
      navigate("/home");
    }
    else{
      navigate("/about");
      dispatch(logoutAction); 
    }
  }

  window.addEventListener("load", log);

  return (
    <>
        {logged && <Header />}
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
            <Route path="/goals" element={<GoalsPage/>}/>
        </Routes>
    </>
  );
}

export default App;
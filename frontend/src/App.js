import './App.css';
import {BrowserRouter, Routes,  Route} from "react-router-dom";
import MainNav from "./components/Nav";
import RegistrationPage from "./pages/RegistrationPage";
import LogIn from "./pages/LogInPage";
import UsersPage from "./pages/UsersPage";
import ColorCardsPage from "./pages/ColorCardsPage";
import IconsPage from "./pages/IconsPage";
import SingleUserPage from "./pages/SingleUserPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <MainNav/>

        <Routes>
            <Route path="/" element={<RegistrationPage/>}/>
            <Route path={"/logIn"} element={<LogIn />}/>
            <Route path={"/users"} element={<UsersPage />}/>
            <Route path={"/users/:username"} element={<SingleUserPage />}/>
            <Route path={"/cards"} element={<ColorCardsPage />}/>
            <Route path={"/icons"} element={<IconsPage />}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;

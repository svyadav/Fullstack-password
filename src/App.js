import './App.css';
import {BrowserRouter,Routes,Route,Navigate} from "react-router-dom"
import Dashboard from './Components/Dashboard';
import Login from "./Components/Login"
import PasswordReset from './Components/PasswordReset';
import ForgetPassword from './Components/ForgetPassword';
import Signup from './Components/Signup';


function App() {
  return <>
  <BrowserRouter>
  <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/dashboard" element={<Dashboard/>}/>
    <Route path="/password-reset" element={<PasswordReset/>}/>
    <Route path="/forgetpassword/:id/:token" element={<ForgetPassword/>}/>
    <Route path="*" element={<Navigate to={"/login"}/>}/>
  </Routes>
  </BrowserRouter>
  </>
}

export default App;

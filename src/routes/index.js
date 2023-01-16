import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from '../pages/Login'
import Private from "../pages/Private";
import Register from "../pages/Register";





function RoutesApp() {
    return (

        <Routes>
            <Route exact path="/" element={<Login/>} />
            <Route exact path="/home" element={<Private><Home/></Private>} />
            <Route exact path="/register" element={<Register/>} />

        </Routes>

    )
}


export default RoutesApp;
import { Route, Routes } from "react-router-dom";
import Home from "@/pages/Home";
import ForgetPassword from "@/pages/ForgetPassword";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import ErrorPage from "@/pages/ErrorPage";

function Routing () {
    return(
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgetPassword" element={<ForgetPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Routing;

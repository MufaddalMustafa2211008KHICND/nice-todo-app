import ForgetPassword from "@/pages/ForgetPassword";
import Login from "@/pages/Login";
import ResetPassword from "@/pages/ResetPassword";
import { Home } from "lucide-react";
import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import ErrorPage from "@/pages/ErrorPage";

function Routing () {
    return(
        <Routes>
        <Route path="/" element={ <AuthRoute> <Home /></AuthRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgetPassword" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        {/* <Route path='/signup' element={<Signup />}></Route> */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    )
}

export default Routing;
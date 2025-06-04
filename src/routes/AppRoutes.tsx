import App from "@/App";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>
    },
    {
        path: "/login",
        element: <Login></Login>
    },
    {
        path: "/signup",
        element: <SignUp></SignUp>
    }
]);

export default router;
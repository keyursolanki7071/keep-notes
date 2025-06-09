import AuthLayout from "@/components/layout/AuthLayout";
import Login from "@/pages/auth/Login";
import SignUp from "@/pages/auth/SignUp";
import Dashboard from "@/pages/Dashboard";
import NoteIndex from "@/pages/note/Index";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
    {
        path: "/",
        Component: AuthLayout,
        children: [
            {
                path: "",
                Component: Dashboard
            },
            {
                path: "/note/:id",
                Component: NoteIndex
            }
        ]
    },
    {
        path: "/login",
        Component: Login
    },
    {
        path: "/signup",
        Component: SignUp
    }
]);

export default router;
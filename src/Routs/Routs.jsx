import { createBrowserRouter } from "react-router";
import MainLayouts from "../Layouts/MainLayouts";
import HomePage from "../Pages/HomePage";
import AboutUs from "../Pages/AboutUs";
import Profile from "../Pages/Profile";
import Signup from "../Pages/Signup";
import Singin from "../Pages/Singin";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: MainLayouts,
        children: [
            {
                index: true,
                element: <HomePage></HomePage>
            },
            {
                path: "/aboutus",
                element: <AboutUs></AboutUs>
            },
            {
                path: "/profile",
                element: <Profile></Profile>
            },
            {
                path: "/signup",
                element: <Signup></Signup>
            },
            {
                path: "/signin",
                element: <Singin></Singin>
            }
        ]
    }
])
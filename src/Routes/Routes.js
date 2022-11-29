import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Category from "../Pages/Category";
import AddProduct from "../Pages/Dashboard/AddProduct";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHomepage from "../Pages/Dashboard/DashboardHomepage";
import Homepage from "../Pages/Homepage/Homepage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Protected from "./Protected";



export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Homepage></Homepage>                
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/category/:categoryId',
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.categoryId}`),
                element: <Protected><Category></Category></Protected>
            },
        ]
    },

    {
        path: '/dashboard',
        element: <Protected><Dashboard></Dashboard></Protected>,
        children: [
            {
                path: '/dashboard',
                element: <DashboardHomepage></DashboardHomepage>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },

        ]
    }
]);

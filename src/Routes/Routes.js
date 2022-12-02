import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Blog from "../Pages/Blog";
import Category from "../Pages/Category";
import AddProduct from "../Pages/Dashboard/AddProduct";
import AllBuyers from "../Pages/Dashboard/AllBuyers";
import AllSellers from "../Pages/Dashboard/AllSellers";
import Dashboard from "../Pages/Dashboard/Dashboard";
import DashboardHomepage from "../Pages/Dashboard/DashboardHomepage";
import MyOrders from "../Pages/Dashboard/MyOrders";
import MyProducts from "../Pages/Dashboard/MyProducts";
import ReportedItems from "../Pages/Dashboard/ReportedItems";
import Homepage from "../Pages/Homepage/Homepage";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import Unhandled from "../Pages/Unhandled";
import AdminRoute from "./AdminRoute";
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
                loader: ({ params }) => fetch(`https://lantabur-tv-buy-sell-portal-server-asadaman42.vercel.app/category/${params.categoryId}`),
                element: <Protected><Category></Category></Protected>
            },
            {
                path: '/blog',
                element: <Blog></Blog> 
            },
            {
                path: '/*',
                element: <Unhandled></Unhandled>
            }
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
                path: '/dashboard/allsellers',
                element: <AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path: '/dashboard/allbuyers',
                element: <AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path: '/dashboard/reporteditems',
                element: <AdminRoute><ReportedItems></ReportedItems></AdminRoute>
            },
            {
                path: '/dashboard/myorders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addproduct',
                element: <AddProduct></AddProduct>
            },
            {
                path: '/dashboard/myproducts',
                element: <MyProducts></MyProducts>
            },
            {
                path: '/dashboard/*',
                element: <Unhandled></Unhandled>
            }

        ]
    }
]);

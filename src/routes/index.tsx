// 引入路由组件
import {
    createBrowserRouter,
} from "react-router-dom";

// 页面组件
import MainPage from '../component/MainPage.tsx'; 
import Navbar from '../component/Navbar.tsx'; 
// ErrorComponent
import ErrorPage from "../component/Error.tsx";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Navbar />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <MainPage />
            },
            {
                path: "contacts/:contactId",
                element: <MainPage />
            },
        ],
    },
]);

export default router;

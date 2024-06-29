import { Navigate, createHashRouter } from "react-router-dom";

import DefaultLayout from "./components/layouts/DefaultLayout/DefaultLayout";
import GuestLayout from "./components/layouts/GuestLayout/GuestLayout";

import Inventario from "./views/Inventario/Inventario";
import Mecanicos from "./views/Mecanicos/Mecanicos";
import Login from "./views/Login/Login";

const router = createHashRouter([
    {
        path: "/",
        element: <DefaultLayout />,
        children: [
            {
                path: "/inventario",
                element: <Navigate to="/" />
            },
            {
                path: "/",
                element: <Inventario />
            },
            {
                path: "/mecanicos",
                element: <Mecanicos />
            }
        ]
    },
    {
        path: "/",
        element: <GuestLayout />,
        children: [
            {
                path: "/login",
                element: <Login />
            }
        ]
    }
]);

export default router;
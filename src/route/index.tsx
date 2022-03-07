import { Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@pages/Login";
import NotFound from "@/pages/NotFound";

const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

import { Navigate } from "react-router-dom";
import io from "socket.io-client";
import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@pages/Login";
import NotFound from "@/pages/NotFound";
import { SOCKET_OPTIONS, SOCKET_URL } from "@/const/config";

const socket = io(SOCKET_URL, SOCKET_OPTIONS);

const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home socket={socket} /> },
  { path: "/", element: <Navigate to="/home" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

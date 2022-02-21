import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@pages/Login";

const routes = [
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/home", element: <Home /> },
  { path: "/", element: <Login /> },
];

export default routes;

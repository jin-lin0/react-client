import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@pages/Login";

const routes = [
  { path: "/Login", element: <Login /> },
  { path: "/Register", element: <Register /> },
  { path: "/Home", element: <Home /> },
  { path: "/", element: <Login /> },
];

export default routes;

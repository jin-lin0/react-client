import ReactDOM from "react-dom";
import { useRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import routeList from "@/route";
import "./index.css";
import "normalize.css";

const App = () => useRoutes(routeList);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

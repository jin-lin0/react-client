import ReactDOM from "react-dom";
import { useRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { GlobalContext } from "./context";
import routeList from "@/route";
import "./index.css";
import "normalize.css";

const App = () => (
  <GlobalContext.Provider value={{ login: true }}>
    {useRoutes(routeList)}
  </GlobalContext.Provider>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

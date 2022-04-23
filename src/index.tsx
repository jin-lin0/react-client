import ReactDOM from "react-dom";
import { useRoutes } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GlobalContext } from "./context";
import routeList from "@/route";
import "./index.css";
import "normalize.css";

const App = () => (
  <GlobalContext.Provider value={{ login: true }}>
    <DndProvider backend={HTML5Backend}>{useRoutes(routeList)}</DndProvider>
  </GlobalContext.Provider>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

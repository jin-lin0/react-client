import ReactDOM from "react-dom";
import routeList from "@/route";
import CRoute from "@components/CRoute";
import "./index.css";
import "normalize.css";

ReactDOM.render(CRoute(routeList), document.getElementById("root"));

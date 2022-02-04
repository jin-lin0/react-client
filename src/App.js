import "@/App.less";
import { hot } from "react-hot-loader/root";
import Login from "@/pages/Login";

function App() {
  return (
    <div className="App">
      <Login />
    </div>
  );
}

export default process.env.NODE_ENV === "development" ? hot(App) : App;

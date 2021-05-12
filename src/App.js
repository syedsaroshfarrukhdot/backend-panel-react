import logo from "./logo.svg";
import "./App.css";
import Form from "./components/Form";
import DefaultViews from "./components/MainView/DefaultView";
import AuthView from "./components/MainView/AuthView";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Auth from "./components/Auth";

function App() {
  return (
    <>
      <DefaultViews />
      <ToastContainer />
      <AuthView />
    </>
  );
}

export default App;

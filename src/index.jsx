import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Task from "./Component/Task";
import UserLogin from "./Component/UserLogin";
import UserRegister from "./Component/UserRegister"
import { Auth0Provider } from '@auth0/auth0-react';
import NavBar from "./Component/NavBar"

import "./index.css";

function requireAuth(nextState, replace, next) {
  const authenticated = !!localStorage.getItem("access-token");
  console.log("authenticated"+authenticated)
  if (!authenticated) {
    replace({
      pathname: "/",
      state: {nextPathname: nextState.location.pathname}
    });
  }
  next();
}

export default function App() {
  return (
    <BrowserRouter>
    <Auth0Provider>
    <NavBar/>
      <Routes>
        <Route path="/" element={<UserLogin />} />
        <Route path="tasks" element={<Task />}  onEnter={requireAuth} />
        <Route path="register" element={<UserRegister />} />
      </Routes>
      </Auth0Provider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);

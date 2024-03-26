import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import {BASE_URL} from '../constants'


const UserLogin = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const loginUser = async (e) => {
    console.log("login user");
    e.preventDefault();
    const response = await fetch(BASE_URL + "authenticate/token", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem("access-token", data.access);
      localStorage.setItem("refresh-token", data.refresh);
      navigate("/tasks");
    }else{
      throw new Error("Failed to add task");
    }

  };
  return (
    <>
      <div class="w-55 d-flex align-items-center justify-content-center mt-5">
        <form className="w-50 shadow p-5" onSubmit={loginUser}>
          <h5 className="text-center">Login User</h5>

          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group mt-4 text-center">
            <Link to="/register">Register</Link>
            <button type="submit" className="btn ml-4 btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserLogin;

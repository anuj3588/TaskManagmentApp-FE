import React, { useState } from "react";
import * as constant from "../constants";
import { Link } from "react-router-dom";

const UserRegister = () => {
  const changeFormValues = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
    password2: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    console.log(formData);

    const response = await fetch(constant.BASE_URL + "authenticate/register", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
        document.getElementById("popup")
        .innerHTML +=
        `<div class="alert alert-danger d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="danger:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
            Something went wrong
        </div>
        </div>`;
    }
    if (response.ok) {
      document.getElementById(
        "popup"
      ).innerHTML += `<div class="alert alert-success d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
            <div>
                User register successfully
            </div>
            </div>`;
    }
    setFormData({
      first_name: "",
      last_name: "",
      email: "",
      username: "",
      password: "",
      password2: "",
    });
  };
  return (
    <div className="row mt-4">
      <div className="container shadow ">
        <div className="col justify-content-center">
          <form className="shadow p-5" onSubmit={registerUser}>
            <h5 className="text-center " id="popup">
              Register User
            </h5>

            <div className="form-group">
              <label for="firstName">First Name</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                name="first_name"
                placeholder="Enter first name"
                onChange={changeFormValues}
              />
            </div>

            <div className="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                name="last_name"
                placeholder="Enter last name"
                onChange={changeFormValues}
              />
            </div>

            <div className="form-group">
              <label for="email">Email</label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                onChange={changeFormValues}
              />
            </div>

            <div className="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Enter username"
                onChange={changeFormValues}
              />
            </div>

            <div className="form-group">
              <label for="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                onChange={changeFormValues}
              />
            </div>

            <div className="form-group">
              <label for="password2">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="password2"
                name="password2"
                placeholder="Confirm Password"
                onChange={changeFormValues}
              />
            </div>
            <div className="form-group mt-4 text-center">
              <button type="submit" className="btn btn-primary">
                Register
              </button>
              <Link className="ml-4" to="/">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserRegister;

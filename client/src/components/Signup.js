import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Signup(props) {
  const host = "/.netlify/functions/index";
  const [cred, setcred] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  let history = useHistory();
  const onchange = (e) => {
    setcred({ ...cred, [e.target.name]: e.target.value });
  };
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (cred.password !== cred.cpassword) {
      props.showalert("Passwords do not match", "danger");
      setcred({ name: "", email: "", password: "", cpassword: "" });
    } else {
      const response = await fetch(`${host}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: cred.name,
          email: cred.email,
          password: cred.password,
        }),
      });
      const json = await response.json();
      if (json.success) {
        //save the auth token and redirect
        localStorage.setItem("token", json.authtoken);
        history.push("/");
        props.showalert("Account created successfully", "success");
      } else {
        props.showalert("Email already exists", "danger");
        setcred({ name: "", email: "", password: "", cpassword: "" });
      }
    }
  };
  return (
    <>
      <div className="border-gray-300 shadow-lg border-2 my-6 p-4 rounded-xl">
        <h1 className="text-2xl font-bold mb-4">SignUp to CloudNotes :</h1>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              value={cred.name}
              name="name"
              id="name"
              minLength={3}
              required
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              value={cred.email}
              name="email"
              id="email"
              onChange={onchange}
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              value={cred.password}
              name="password"
              id="password"
              minLength={5}
              required
              onChange={onchange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              value={cred.cpassword}
              name="cpassword"
              id="cpassword"
              minLength={5}
              required
              onChange={onchange}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary text-sky-600 font-bold mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default Signup;

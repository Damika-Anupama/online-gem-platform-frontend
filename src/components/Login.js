import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import gemBid from "../apis/gemBid";
import AuthService from "../services/auth.service";
import { required } from "./required";

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const[login,setLogin] = useState(false);
  const [message, setMessage] = useState("");


  const handleLogin = (e) => {
    e.preventDefault();
    gemBid.get("/get/user",{
      headers:{"Content-Type":"application/json","Access-Control-Allow-Origin":"*"}
    }).then(res=>res.json())
    .then((result)=>{
      console.log(result)
    for(let i=0; i<result.length; i++){
      if (result[i].userName===username) {
        setLogin(true);
        if(result[i].role==="admin"){
          window.location="http://localhost:3001/admin"
        }
      }
    }
    if(!login){
      alert("erro username or password")
      window.location="http://localhost:3001/login"
    }
      })
  }
  return (
    
    <div className="col-md-12">
      <div className="card card-container">
        <img 
          src="https://cdn.pixabay.com/photo/2020/07/14/13/07/icon-5404125_960_720.png"
          alt="profile-img"
          className="profile-img-card"
        />


        <Form onSubmit={(e)=>handleLogin(e)}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
             validations={required}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
               validations={required}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;
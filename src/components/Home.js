import React, { useState, useEffect } from "react";
import NavBar from "./Navbar/Nav"
import UserService from "../services/user.service";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  return (
    <div className="container">
      <NavBar/>
      <header className="jumbotron">
        {/* <h3>{content}</h3> */}
        <h3>This is our home page</h3>
      </header>
    </div>
  );
};

export default Home;
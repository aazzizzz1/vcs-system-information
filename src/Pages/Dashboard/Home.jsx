import Cookies from "js-cookie";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
    <div className="p-4 mt-14">

      {!Cookies.get("token") && (
        <li>
          <Link to={"/signin"}>Login</Link>
        </li>
      )}
      {Cookies.get("token") && (
        <li>
          <span
            onClick={() => {
              Cookies.remove("token");
              navigate("/signin");
            }}
          >
            Logout
          </span>
        </li>
      )}
      <div>Home</div>
    </div>
    </>
  );
};

export default Home;

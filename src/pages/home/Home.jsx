import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/usersSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user); // Get logged-in user from Redux

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3A2C99",
        color: "#ffffff",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>
        <Typewriter
          options={{
            strings: user ? [`You are Logged In, ${user.username}`] : ["WELCOME TO MY QUICK CRM TASK"],
            autoStart: true,
            loop: true,
            delay: 75,
          }}
        />
      </h1>

      {user ? (
        // Show Dashboard and Logout Buttons when logged in
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            type="primary"
            size="large"
            onClick={() => navigate("/dashboard")}
            style={{
              backgroundColor: "#cab426",
              borderColor: "#cab426",
              fontSize: "18px",
              padding: "10px 30px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Go to Dashboard
          </Button>

          <Button
            type="default"
            size="large"
            onClick={handleLogout}
            style={{
              backgroundColor: "#ff0307",
              borderColor: "#ff0307",
              color: "#fff",
              fontSize: "18px",
              padding: "10px 30px",
              borderRadius: "5px",
              fontWeight: "bold",
            }}
          >
            Logout
          </Button>
        </div>
      ) : (
        // Show Get Started button if not logged in
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/login")}
          style={{
            backgroundColor: "#1e7224",
            borderColor: "#1e7224",
            fontSize: "18px",
            padding: "10px 30px",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          GET STARTED
        </Button>
      )}
    </div>
  );
};

export default Home;

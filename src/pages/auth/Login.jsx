import React from "react";
import { Form, Card } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import CustomInput from "../../components/user/CustomInput";
import CustomButton from "../../components/user/CustomButton";
import bgImage from "../../assets/images/bg_auth.png";
import "./Login.css";
import { toast } from "react-hot-toast";
import { loginAPI } from "../../apicalls/auth"; 
import { setButtonLoading } from "../../redux/loadersSlice";
import { loginSuccess } from "../../redux/usersSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const buttonLoading = useSelector((state) => state.loaders.buttonLoading);

  const onFinish = async (values) => {
    console.log("Login form submitted:", values);
    
    dispatch(setButtonLoading(true)); // Start loading
  
    try {
      const response = await loginAPI(values);
      console.log("Login success response:", response);
      
      dispatch(loginSuccess(response)); // Dispatch action manually
      toast.success(`Welcome ${response.firstName}!`);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error || "Invalid login credentials");
    } finally {
      dispatch(setButtonLoading(false)); // Stop loading
    }
  };
  
  
  return (
    <div className="login-container">
      <div className="login-bg" style={{ backgroundImage: `url(${bgImage})` }}></div>

      <div className="login-form-container">
        <Card className="login-card">
          <h4 className="text-center mb-4">Login into your account</h4>
          <Form layout="vertical" onFinish={onFinish} onFinishFailed={() => console.log("Validation failed")}>
            <CustomInput
              label="Username"
              name="username"
              type="text"
              placeholder="Enter your username"
              icon={<MailOutlined className="input-icon" />}
            />
            <CustomInput
              label="Password"
              name="password"
              type="password"
              placeholder="Enter your password"
              icon={<LockOutlined className="input-icon" />}
            />

            <div className="forgot-password">
              <a href="#">Forgot password?</a>
            </div>

            <CustomButton text="Login now" block className="auth-button-1" loading={buttonLoading} />
            <div className="text-center my-3">OR</div>
            <CustomButton text="Signup now" block className="auth-button-2" />
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Login;

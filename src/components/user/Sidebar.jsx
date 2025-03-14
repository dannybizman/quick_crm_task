import React, { useState, useEffect } from "react";
import { Layout, Menu, Dropdown } from "antd";
import { NavLink, useNavigate } from "react-router-dom";
import {
  UserOutlined,
  QuestionCircleOutlined,
  HomeOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import "./user.css";
import { fetchUserData } from "../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/usersSlice";

const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.user); // Get logged-in user from Redux
  const [logoCollapsed, setLogoCollapsed] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage
    if (accessToken) {
      fetchUserData(accessToken).catch((error) =>
        console.error("Error fetching user:", error)
      );
    }
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  const userMenu = (
    <Menu>
      <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
        Logout
      </Menu.Item>
    </Menu>
  );

  return (
    <Sider
      collapsible
      collapsed={isMobile ? true : collapsed}
      onCollapse={(value) => setCollapsed(value)}
      trigger={null}
      width={240}
      className={`sidebar ${collapsed ? "collapsed" : ""}`}
    >
      {/* Sidebar Container */}
      <div className="sidebar-content">
        {/* Sidebar Header */}
        <div className="logo-container">
          <NavLink to="/">
            <img
              src="/assets/images/Logo_icon_img.png"
              alt="Small Logo"
              className={`logo-img ${logoCollapsed ? "show" : "hide"}`}
            />
          </NavLink>
          {!logoCollapsed && (
            <NavLink to="/">
              <img
                src="/assets/images/brand_Logo.png"
                alt="Full Logo"
                className="expanded-logo"
              />
            </NavLink>
          )}
        </div>

        {/* Sidebar Menu */}
        <Menu mode="inline" className="menu-sty" theme="light">
          <Menu.Item key="home" icon={<HomeOutlined />}>
            <NavLink to="/">{!collapsed && "Home"}</NavLink>
          </Menu.Item>

          <Menu.Item key="users" icon={<UserOutlined />}>
            <NavLink to="#">{!collapsed && "Users"}</NavLink>
          </Menu.Item>

          <Menu.Item key="help" icon={<QuestionCircleOutlined />}>
            <NavLink to="#">{!collapsed && "Help"}</NavLink>
          </Menu.Item>
        </Menu>
      </div>

      {/* Bottom Section */}
      <div className="sidebar-bottom">
        {!collapsed && (
          <div className="upgrade-card">
            <p>Upgrade to PRO to get access to all Features!</p>
            <button className="pro-btn">Get Pro Now!</button>
          </div>
        )}

        {/* User Profile Dropdown */}
        <Dropdown overlay={userMenu} trigger={["click"]}>
          <div className="user-profile" style={{ cursor: "pointer" }}>
            <img
              src="https://randomuser.me/api/portraits/women/32.jpg"
              alt="user"
            />
            {!collapsed && user && (
              <div>
                <p className="username text-dark">{user.firstName}</p>
                <p className="role text-dark">Project Manager</p>
              </div>
            )}
          </div>
        </Dropdown>
      </div>
    </Sider>
  );
};

export default Sidebar;

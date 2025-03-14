import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { NavLink } from "react-router-dom";
import { UserOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { useMediaQuery } from "react-responsive";
import "./user.css";
import { fetchUserData } from "../../apicalls/users";
const { Sider } = Layout;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken"); // Get token from localStorage
    if (accessToken) {
      fetchUserData(accessToken)
        .then((userData) => setUser(userData))
        .catch((error) => console.error("Error fetching user:", error));
    }
  }, []);

  console.log("Sidebar collapsed:", collapsed);

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
          <>
            {collapsed && (
              <img
                src="/assets/images/Logo_icon_img.png"
                alt="Logo Icon"
                className="logo-img"
              />
            )}

            <div className="sidebar-logo">
              {!collapsed && (
                <img
                  src="/assets/images/Logo_icon_img.png"
                  alt="Full Logo"
                  className="logo-img"
                />
              )}
              <span className="logo-text">Dashboard v0.1</span>
            </div>
          </>
        </div>

        {/* Sidebar Menu */}
        <Menu mode="inline" className="menu-sty" theme="light">
          <Menu.Item key="users" icon={<UserOutlined />}>
            <NavLink to="/admin/users/list">{!collapsed && "Users"}</NavLink>
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

        {/* User Profile */}

        <div className="user-profile">
        <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="user" />
          {!collapsed && user && (
            <div>
              <p className="username">{user.firstName}</p>
              <p className="role">Project Manager</p>
            </div>
          )}
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;

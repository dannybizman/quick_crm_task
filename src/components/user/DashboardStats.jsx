import React, { useState, useEffect } from "react";
import { Card, Row, Col, Skeleton } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  DesktopOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
} from "@ant-design/icons";
import "./user.css";

const DashboardStats = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setStats({
        totalUsers: 5423,
        members: 1893,
        activeNow: 189,
        changeUsers: 16,
        changeMembers: -1,
      });
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="dashboard-container">
      <Card className="stat-card">
        <Row gutter={0} className="dashboard-metrics">
          {/* Total Users */}
          <Col xs={24} sm={8} className="stat-item">
            {loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <div className="stat-content">
                <div className="icon-container">
                  <UserOutlined className="stat-icon" />
                </div>
                <div>
                  <p className="stat-label">Total Users</p>
                  <h2 className="stat-number">{stats.totalUsers}</h2>
                  <p className={`stat-change ${stats.changeUsers > 0 ? "positive" : "negative"}`}>
                    <ArrowUpOutlined /> {stats.changeUsers}% this month
                  </p>
                </div>
              </div>
            )}
          </Col>

          {/* Members */}
          <Col xs={24} sm={8} className="stat-item">
            {loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <div className="stat-content">
                <div className="icon-container">
                  <TeamOutlined className="stat-icon" />
                </div>
                <div>
                  <p className="stat-label">Members</p>
                  <h2 className="stat-number">{stats.members}</h2>
                  <p className={`stat-change ${stats.changeMembers > 0 ? "positive" : "negative"}`}>
                    <ArrowDownOutlined /> {stats.changeMembers}% this month
                  </p>
                </div>
              </div>
            )}
          </Col>

          {/* Active Now */}
          <Col xs={24} sm={8} className="stat-item">
            {loading ? (
              <Skeleton active paragraph={{ rows: 1 }} />
            ) : (
              <div className="stat-content">
                <div className="icon-container">
                  <DesktopOutlined className="stat-icon" />
                </div>
                <div>
                  <p className="stat-label">Active Now</p>
                  <h2 className="stat-number">{stats.activeNow}</h2>
                  <div className="avatars">
                    <img src="https://randomuser.me/api/portraits/women/32.jpg" alt="user" />
                    <img src="https://randomuser.me/api/portraits/men/33.jpg" alt="user" />
                    <img src="https://randomuser.me/api/portraits/women/34.jpg" alt="user" />
                    <img src="https://randomuser.me/api/portraits/men/35.jpg" alt="user" />
                    <img src="https://randomuser.me/api/portraits/women/36.jpg" alt="user" />
                  </div>
                </div>
              </div>
            )}
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default DashboardStats;

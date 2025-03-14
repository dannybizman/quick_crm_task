import React, { useState, useEffect } from "react";
import { Table, Tag, Input, Select, Skeleton } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { getAllUsers } from "../../apicalls/users"; 
import "./user.css";

const { Search } = Input;
const { Option } = Select;

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await getAllUsers();
      const formattedData = data.map((user) => ({
        key: user.id,
        name: `${user.firstName} ${user.lastName}`,
        company: user.company?.name || "N/A",
        phone: user.phone,
        email: user.email,
        country: user.address?.country || "N/A",
        status: user.role === "admin" ? "Active" : "Inactive",
      }));
      setUsers(formattedData);
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const columns = [
    { title: "Users Name", dataIndex: "name", key: "name" },
    { title: "Company", dataIndex: "company", key: "company" },
    { title: "Phone Number", dataIndex: "phone", key: "phone" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Country", dataIndex: "country", key: "country" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={status === "Active" ? "green" : "red"}>{status}</Tag>
      ),
    },
  ];

  return (
    <div className="user-container">
      <h2 className="table-title">All Users</h2>
      <p className="active-members">Active Members</p>

      <div className="filter-container">
        {loading ? (
          <Skeleton.Input style={{ width: 250 }} active />
        ) : (
          <Search
            placeholder="Search users"
            onSearch={(value) => setSearchText(value)}
            style={{ width: 250 }}
            prefix={<SearchOutlined />}
          />
        )}

        {loading ? (
          <Skeleton.Button style={{ width: 120 }} active />
        ) : (
          <Select defaultValue="newest" onChange={(value) => setSortOrder(value)}>
            <Option value="newest">Newest</Option>
            <Option value="oldest">Oldest</Option>
          </Select>
        )}
      </div>

      <Skeleton active loading={loading} paragraph={{ rows: 8 }}>
        <Table
          columns={columns}
          dataSource={users}
          pagination={{
            pageSize: 8,
            showSizeChanger: false,
            itemRender: (_, type, originalElement) => {
              if (type === "prev") return <a>&lt;</a>;
              if (type === "next") return <a>&gt;</a>;
              return originalElement;
            },
          }}
          className="custom-table"
          scroll={{ x: 600 }}
        />
      </Skeleton>
    </div>
  );
};

export default UsersTable;

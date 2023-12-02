import { Typography } from "@mui/material";

import {
  AppstoreOutlined,
  TeamOutlined,
  UserOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space, Avatar } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const AdminPage = () => {
  // const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const userAccount = useSelector((state) => state.auth.user);
  // console.log(userAccount);
  const item = [
    {
      key: "dashboard",
      icon: <AppstoreOutlined />,
      label: <Link to={"/admin"}>DashBoard</Link>,
    },
    {
      label: <Link to="/admin/user-manage">User Manager</Link>,
      key: "User",
      icon: <TeamOutlined />,
    },
  ];

  return (
    <>
      <Layout style={{ minHeight: "100vh" }} className="layout-seller">
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          theme="light"
          style={{ borderRight: " 1px solid #ececec" }}
        >
          <div style={{ height: 32, margin: 16, textAlign: "center" }}>
            Admin
          </div>

          <Menu mode="inline" defaultSelectedKeys={["1"]} items={item} />
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
              background: "#ffffff",
              borderBottom: "1px solid #ebebeb",
            }}
          >
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
                width: 64,
                height: 64,
              }}
            />
          </Header>
          <div
            className="seller-avatar"
            style={{
              position: "absolute",
              right: "45px",
              top: "15px",
              cursor: "pointer",
            }}
          >
            <Space>
              <Avatar size="middle" icon={<UserOutlined />} />
              <span style={{ color: "blue", fontSize: "16px" }}>
                {userAccount?.shop.name || "Admin"}
              </span>
            </Space>
          </div>

          <Content
            style={{
              margin: "28px 16px",
              padding: 24,
              minHeight: 280,
              background: "#ffffff",
              //background:'#f5f5f5'
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminPage;

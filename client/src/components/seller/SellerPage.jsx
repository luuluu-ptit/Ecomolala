import { Typography } from "@mui/material";

import {
  AppstoreOutlined,
  ExceptionOutlined,
  GiftOutlined,
  UserOutlined,
  InboxOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  IdcardOutlined,
  AppstoreAddOutlined,
  UnorderedListOutlined,
  OrderedListOutlined,
  FileAddOutlined,
  CarOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, theme, Dropdown, Space, Avatar } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;

const SellerPage = () => {
  // const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const userAccount = useSelector((state) => state.auth.user);
  // console.log(userAccount);
  const item = [
    {
      key: "dashboard",
      icon: <AppstoreOutlined />,
      label: <Link to={"/seller"}>DashBoard</Link>,
    },
    {
      icon: <InboxOutlined />,
      label: <span>Quản lý sản phẩm</span>,
      children: [
        {
          label: <Link to="/seller/products-manage">Tất cả sản phẩm</Link>,
          key: "Products",
          icon: <UnorderedListOutlined />,
        },
        {
          label: <Link to={"/seller/new-product"}>Thêm sản phẩm</Link>,
          key: "Add_product",
          icon: <AppstoreAddOutlined />,
        },
      ],
    },
    {
      icon: <GiftOutlined />,
      label: <span>Kênh Marketing</span>,
      children: [
        {
          label: <Link to="/seller/new-discount">Thêm mã giảm giá</Link>,
          key: "Add_discount",
          icon: <FileAddOutlined />,
        },
        {
          label: <Link to="">Mã giảm giá của tôi</Link>,
          key: "My_discount",
          icon: <OrderedListOutlined />,
        },
        {
          label: <Link to="">Sản Phẩm Có Mã Giảm Giá</Link>,
          key: "productsApllyDiscount",
          icon: <UnorderedListOutlined />,
        },
      ],
    },
    {
      key: "Shop",
      icon: <IdcardOutlined />,
      label: <Link to="">Hồ Sơ Cửa hàng</Link>,
    },
    {
      key: "Order",
      icon: <ExceptionOutlined />,
      label: <Link to="">Quản Lý Đơn Hàng</Link>,
    },
    {
      key: "Ship",
      icon: <CarOutlined />,
      label: <Link to="">Quản Lý Vận Chuyển</Link>,
    },
    // {
    //   key: "return home",
    //   // icon: <AppstoreOutlined />,
    //   label: <Link to={"/"}>Return Home Page</Link>,
    // },
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
          <div
            style={{
              height: 32,
              margin: 30,
              textAlign: "center",
              color: "#0079d3",
            }}
          >
            <h1>ECOMOLALA</h1>KÊNH NGƯỜI BÁN
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
                {userAccount?.shop.name || "Seller"}
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

export default SellerPage;

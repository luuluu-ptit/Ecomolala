import './App.scss';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Register from './pages/Register';
import HomePage from './pages/Home';
import ProductDetail from './components/products/productDetail'
import ProductSearch from './components/Search/productsSearch'
import SellerBoard from './pages/Sellerboard';
import CartPage from './pages/Cart';
import CheckoutPage from './pages/Checkout';
import Profile from './pages/Profile';
import App from './App';
import TableProductSeller from './components/seller/Product/TableProductSeller';
import DashBoard from './components/seller/DashBoard/DashBoard';
import AddProductPage from './components/seller/Product/AddProductPage';
import UpdateProductPage from './components/seller/Product/UpdateProductPage ';
import ForgotPassword from './pages/Password/forgotpassword';
import ResetPassword from './pages/Password/resetPassword';
import CategoryPage from './pages/Category';
import AdminBoard from './pages/Adminboard';
import DashBoardAdmin from './components/Admin/DashBoard';
import TableUserManagerment from './components/Admin/TableUserManagerment';
import { AddDiscountPage } from './components/seller/Discounts/createDiscount';

function Layout() {
    // const user = JSON.parse(localStorage.getItem("user"));
    // const { roles } = user.shop

    // const isAdmin = roles.includes("ADMIN");
    // console.log(isAdmin, "isAdmin");

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/category/:productType" element={<CategoryPage />} />
                    <Route path="/search/:id" element={<ProductSearch />} />
                    <Route path="/products/:id" element={<ProductDetail />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<CartPage />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:resetToken" element={<ResetPassword />} />

                <Route path="/seller" element={<SellerBoard />}>
                    <Route index element={<DashBoard />} />
                    <Route path="products-manage" element={<TableProductSeller />} />
                    <Route path="new-product" element={<AddProductPage />} />
                    {/* <Route path="update-product" element={<UpdateProductPage />} /> */}

                    <Route path="new-discount" element={<AddDiscountPage />} />
                    {/* <Route path="get-discount-shop" element={<AddProductPage />} /> */}
                    {/* <Route path="get-discount-product-shop" element={<AddProductPage />} /> */}
                </Route>
            </Routes>

            <Routes>
                <Route path="/admin" element={<AdminBoard />}>
                    <Route index element={<DashBoardAdmin />} />
                    <Route path="user-manage" element={<TableUserManagerment />} />
                </Route>

                <Route path="admin/login" element={<Login />} />
                <Route path="admin/forgot-password" element={<ForgotPassword />} />
                <Route path="admin/reset-password/:resetToken" element={<ResetPassword />} />
            </Routes>
        </Router>
    );
}

export default Layout;

import './App.scss';
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import { useDispatch } from "react-redux";
import Login from "./pages/Login"
import Register from './pages/Register';
// import NavBar from './components/Navbar';
import HomePage from './pages/Home';
// import Footer from './components/Footer';
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

function Layout() {

    // const dispatch = useDispatch();
    // let location = useLocation();
    // useEffect(() => {
    //   if (["/login", "/register"].includes(location.pathname)) {
    //     dispatch(clearMessage()); // clear message when changing location
    //   }
    // }, [dispatch, location]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path="/search/:id" element={<ProductSearch />} />
                    <Route path="/products/:id" element={<ProductDetail />} />                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<CartPage />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/seller" element={<SellerBoard />}>
                    <Route index element={<DashBoard />} />
                    <Route path="products-manage" element={<TableProductSeller />} />
                    <Route path="new-product" element={<AddProductPage />} />
                    <Route path="update-product" element={<UpdateProductPage />} />
                </Route>
            </Routes>
        </Router>
    );
}

export default Layout;

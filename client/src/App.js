import './App.scss';
import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from './components/Navbar';
import Footer from './components/Footer';

function App() {

  return (
    <div className="container-app">
      <div className="header-app">
        <NavBar />
      </div>
      <div className="content-app">
        <Outlet />
      </div>
      <div className="footer-app">
        <Footer />
      </div>
    </div>
  );
}

export default App;


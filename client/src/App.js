// import './App.css';
// import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// import Login from "./pages/Login"
// import Register from './pages/Register';
// import NavBar from './components/Navbar';
// import HomePage from './pages/Home';
// import Footer from './components/Footer';
// // import { clearMessage } from "./store/actions/message.action";

// function App() {

//   // const dispatch = useDispatch();
//   // let location = useLocation();

//   // useEffect(() => {
//   //   if (["/login", "/register"].includes(location.pathname)) {
//   //     dispatch(clearMessage()); // clear message when changing location
//   //   }
//   // }, [dispatch, location]);

//   return (
//     <Router>
//       <NavBar />
//       <div className="App">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </div>
//       <Footer />
//     </Router>
//   );
// }

// export default App;


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


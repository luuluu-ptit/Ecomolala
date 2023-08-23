// import {
//     loginFailed,
//     loginStart,
//     loginSuccess,
//     registerStart,
//     registerSuccess,
//     registerFailed,
//     logoutStart,
//     logoutSuccess,
//     logoutFailed,
// } from "./apiRequest";
// import axios from "axios";

// export const login = async (user, dispatch, navigate) => {
//     dispatch(loginStart());
//     try {
//         const res = await axios.post("/v1/auth/login", user);
//         dispatch(loginSuccess(res.data));
//         navigate("/");
//     } catch {
//         dispatch(loginFailed());
//     }
// };

// export const register = async (user, dispatch, navigate) => {
//     dispatch(registerStart());
//     try {
//         await axios.post("/v1/auth/register", user);
//         dispatch(registerSuccess());
//         navigate("/login");
//     } catch (err) {
//         console.log(err);
//         dispatch(registerFailed("Something is wrong"));
//     }
// };

// export const logOut = async (dispatch, navigate) => {
//     dispatch(logoutStart());
//     try {
//         const res = await axios.post("/v1/auth/logout");
//         dispatch(logoutSuccess());
//         navigate("/login");
//     } catch (err) {
//         dispatch(logoutFailed());
//     }
// };
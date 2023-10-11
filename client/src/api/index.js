/* eslint-disable import/no-anonymous-default-export */
import axios from 'axios';
import { authHeader, userHeader } from "./auth-header";
// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
//     }

//     return req;
// });

// const PORT = process.env.PORT || 3056;
const API_KEY = "b14f9365f51b86d8a271b929d12a5a157f8ef333ab2fd56e81285a274ee53f46543bf6009efc460f620aa5d913be1b3f074f4aa58db6eac0d2cf0fa263b596aa";
const USER_ID = userHeader().clientId;
const AUTHORIZATION = authHeader().authorization;
// const REFRESHTOKEN = authHeader().authorization;REFRESHTOKEN: 'x-rtoken-id',


const API = axios.create({ baseURL: `http://localhost:5000/api/v1` });

//ACCESS
const login = async (formData) => {
    // console.log(process.env.API_KEY, "process.env.API_KEY");
    try {
        const response = await API.post('/shop/login', formData, { headers: { "x-api-key": API_KEY } });
        // console.log(response.data, "XXXXX");
        return response;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
const register = async (formData) => {
    try {
        return await API.post('/shop/signup', formData, { headers: { "x-api-key": API_KEY } });
    } catch (error) {
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            throw error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            throw error.message;
        }
    }
}
const forgotPassword = (formData) => API.post('/shop/forgotPassword', formData, { headers: { "x-api-key": process.env.API_KEY } });
const resetPassword = (formData) => API.post('/shop/resetPassword/:token', formData, { headers: { "x-api-key": process.env.API_KEY } });

const logout = async () => {

    try {
        return await API.post('/shop/logout', {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
    } catch (error) {
        // throw error;
        console.error(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            throw error.response.data;
        } else if (error.request) {
            // The request was made but no response was received
            throw error.request;
        } else {
            // Something happened in setting up the request that triggered an Error
            throw error.message;
        }
    }
}

const handlerRefreshToken = (formData) => API.post('/shop/handlerRefreshToken', formData, { headers: { "x-api-key": process.env.API_KEY } });

const changePassword = (formData) => API.post('/shop/changePassword', formData, { headers: { "x-api-key": process.env.API_KEY } });
const convertRoleUsertoSeller = (formData) => API.post('/shop/convertRoleUsertoSeller', formData, { headers: { "x-api-key": process.env.API_KEY } });
const cancellationOfSales = (formData) => API.post('/shop/cancellationOfSales', formData, { headers: { "x-api-key": process.env.API_KEY } });



//SHOP
const addLikedProduct = (page) => API.post(`/action/shop/addLikedProduct/:id`, { headers: { "x-api-key": process.env.API_KEY } });
const updateInformationAccessOfUser = (newCart) => API.patch('/action/shop/updateInformationAccessOfUser', newCart, { headers: { "x-api-key": process.env.API_KEY } });


//PRODUCTS
const createProduct = (id) => API.post(`/product/`, { headers: { "x-api-key": process.env.API_KEY } });
const updateProduct = (page) => API.patch(`/product/:productId`, { headers: { "x-api-key": process.env.API_KEY } });
const publishProductByShop = (name) => API.post(`/product/publish/:id`, { headers: { "x-api-key": process.env.API_KEY } });
const unPublishProductByShop = (searchQuery) => API.post(`/product/unpublish/:id`, { headers: { "x-api-key": process.env.API_KEY } });
const getAllDraftsForShop = (newPost) => API.get('/product/drafts/all', newPost, { headers: { "x-api-key": process.env.API_KEY } });
const getAllPublishForShop = (id) => API.get(`/product/published/all`, { headers: { "x-api-key": process.env.API_KEY } });
const getListSearchProduct = (value, id) => API.get(`/product/search/:keySearch`, { value }, { headers: { "x-api-key": process.env.API_KEY } });
const findAllProducts = (id, updatedPost) => API.get(`/product/`, updatedPost, { headers: { "x-api-key": process.env.API_KEY } });
const findProduct = (id) => API.get(`/product/:product_id`, { headers: { "x-api-key": process.env.API_KEY } });


//Cart
const addProductToCart = (page) => API.post(`/cart/`, { headers: { "x-api-key": process.env.API_KEY } });
const updateProductQuantity = (newCart) => API.post('/cart/update', newCart, { headers: { "x-api-key": process.env.API_KEY } });
const getListCart = (id) => API.get(`/cart/`, { headers: { "x-api-key": process.env.API_KEY } });
const deletItemCart = (id, updatedPost) => API.delete(`/cart/`, updatedPost, { headers: { "x-api-key": process.env.API_KEY } });


//DISCOUNT
const createDiscount = (page) => API.post(`/discount/`, { headers: { "x-api-key": process.env.API_KEY } });
const updateDiscountService = (newCart) => API.patch('/discount/:discount_id', newCart, { headers: { "x-api-key": process.env.API_KEY } });
const getDiscountAmount = (id, updatedPost) => API.post(`/discount/amount`, updatedPost, { headers: { "x-api-key": process.env.API_KEY } });
const getAllDiscountWithProduct = (id) => API.get(`/discount/list_product_code`, { headers: { "x-api-key": process.env.API_KEY } });
const getAllDiscountByShop = (id) => API.get(`/discount/`, { headers: { "x-api-key": process.env.API_KEY } });
const deleteDiscount = (id) => API.delete(`/discount/`, { headers: { "x-api-key": process.env.API_KEY } });
const cancelDiscount = (id) => API.patch(`/discount/`, { headers: { "x-api-key": process.env.API_KEY } });

export default {
    login,
    register,
    logout,
    handlerRefreshToken,
    forgotPassword,
    resetPassword,
    changePassword,
    convertRoleUsertoSeller,
    cancellationOfSales,
    addLikedProduct,
    updateInformationAccessOfUser,
    createProduct,
    updateProduct,
    publishProductByShop,
    unPublishProductByShop,
    getAllDraftsForShop,
    getAllPublishForShop,
    getListSearchProduct,
    findAllProducts,
    findProduct,
    addProductToCart,
    updateProductQuantity,
    getListCart,
    deletItemCart,
    createDiscount,
    updateDiscountService,
    getDiscountAmount,
    getAllDiscountWithProduct,
    getAllDiscountByShop,
    deleteDiscount,
    cancelDiscount,
}
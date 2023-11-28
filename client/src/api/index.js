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
// const REFRESHTOKEN = authHeader().authorization; 
// 'x-rtoken-id'

const API = axios.create({ baseURL: `http://localhost:5000/api/v1` });

//ACCESS
const login = async (formData) => {

    try {
        const response = await API.post('/shop/login', formData, {
            headers: {
                "x-api-key": API_KEY
            }
        });
        console.log(response.data, "XXXXX");
        return response;
    } catch (error) {
        console.error(error);
        // throw error;
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
};
const register = async (formData) => {
    try {
        const response = await API.post('/shop/signup', formData, {
            headers: {
                "x-api-key": API_KEY
            }
        });
        return response;
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
const forgotPassword = async (formData) => API.post('/shop/forgotPassword', formData, { headers: { "x-api-key": API_KEY } });
const resetPassword = async (formData) => API.post('/shop/resetPassword/:token', formData, { headers: { "x-api-key": API_KEY } });

const logout = async () => {
    // console.log({
    //     API_KEY,
    //     USER_ID,
    //     AUTHORIZATION
    // })

    try {
        const response = await API.post('/shop/logout', {}, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        return response;
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

const handlerRefreshToken = async (formData) => API.post('/shop/handlerRefreshToken', formData, { headers: { "x-api-key": API_KEY } });

const changePassword = async (formData) => API.post('/shop/changePassword', formData, { headers: { "x-api-key": API_KEY } });
const convertRoleUsertoSeller = async () => {
    try {
        const response = await API.post('/shop/convertRoleUsertoSeller', {}, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("convertRoleUsertoSeller", response)
        return response;
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
const cancellationOfSales = async (formData) => API.post('/shop/cancellationOfSales', formData, { headers: { "x-api-key": API_KEY } });


//SHOP
const addLikedProduct = async (page) => API.post(`/action/shop/addLikedProduct/:id`, { headers: { "x-api-key": API_KEY } });
const updateInformationAccessOfUser = async (newCart) => API.patch('/action/shop/updateInformationAccessOfUser', newCart, { headers: { "x-api-key": API_KEY } });


//PRODUCTS
const updateProduct = async (page) => API.patch(`/product/:productId`, { headers: { "x-api-key": API_KEY } });
const publishProductByShop = async (name) => API.post(`/product/publish/:id`, { headers: { "x-api-key": API_KEY } });
const unPublishProductByShop = async (searchQuery) => API.post(`/product/unpublish/:id`, { headers: { "x-api-key": API_KEY } });
const getListSearchProduct = async (value) => {
    try {
        const response = await API.get(`/product/search/${value}/`, {
            headers: { "x-api-key": API_KEY }
        });
        // console.log("getListSearchProduct", response)
        return response;
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

const createProduct = (data) => API.post(`/product/`, { ...data }, { headers: { "x-api-key": API_KEY, "x-client-id": USER_ID, "authorization": AUTHORIZATION } });
const getAllPublishForShop = () => API.get(`/product/published/all`, { headers: { "x-api-key": API_KEY, "x-client-id": USER_ID, "authorization": AUTHORIZATION } });
const getAllDraftsForShop = () => API.get('/product/drafts/all', { headers: { "x-api-key": API_KEY, "x-client-id": USER_ID, "authorization": AUTHORIZATION } });

//console.log('object===>',AUTHORIZATION);

const findAllProducts = () => API.get(`/product/`, { headers: { "x-api-key": API_KEY } });
const findProduct = (id) => API.get(`/product/${id}`, { headers: { "x-api-key": API_KEY } });

//Cart
const addProductToCart = (page) => API.post(`/cart/`, { headers: { "x-api-key": API_KEY } });
const updateProductQuantity = (newCart) => API.post('/cart/update', newCart, { headers: { "x-api-key": API_KEY } });
const getListCart = async () => {
    try {
        const response = await API.get(`/cart/`, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        // console.log("getListSearchProduct", response)
        return response;
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
const deletItemCart = (id, updatedPost) => API.delete(`/cart/`, updatedPost, { headers: { "x-api-key": API_KEY } });


//DISCOUNT
const createDiscount = (page) => API.post(`/discount/`, { headers: { "x-api-key": API_KEY } });
const updateDiscountService = (newCart) => API.patch('/discount/:discount_id', newCart, { headers: { "x-api-key": API_KEY } });
const getDiscountAmount = (id, updatedPost) => API.post(`/discount/amount`, updatedPost, { headers: { "x-api-key": API_KEY } });
const getAllDiscountWithProduct = (id) => API.get(`/discount/list_product_code`, { headers: { "x-api-key": API_KEY } });
const getAllDiscountByShop = (id) => API.get(`/discount/`, { headers: { "x-api-key": API_KEY } });
const deleteDiscount = (id) => API.delete(`/discount/`, { headers: { "x-api-key": API_KEY } });
const cancelDiscount = (id) => API.patch(`/discount/`, { headers: { "x-api-key": API_KEY } });

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
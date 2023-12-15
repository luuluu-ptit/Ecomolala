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
const forgotPassword = async (email) => {
    try {
        console.log("forgotPassword");
        console.log(email)
        const response = await API.get(`/shop/forgotPassword`, {
            headers: {
                "x-api-key": API_KEY
            },
            params: {
                email: email
            }
        });
        console.log("forgotPassword", response)
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
const resetPassword = async (resetToken, password) => {
    try {
        const response = await API.post(`/shop/resetPassword/${resetToken}`, { password }, {
            headers: {
                "x-api-key": API_KEY
            }
        });
        console.log("resetPassword", response)
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
const updateInformationAccessOfUser = async (name, email) => {
    try {
        const body = {};
        if (!name) body.name = name;
        if (email) body.email = email;
        const res = await API.patch(`/action/shop/updateInformationAccessOfUser`, body, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });

        return res;
    } catch (error) {
        if (error.response && error.response.status === 409) {
            // Handle the conflict here. For example, you might want to prompt the user to enter a different name or email.
            alert('A conflict occurred. Please try again with a different name or email.');
        } else {
            // If it's not a 409 conflict, rethrow the error.
            throw error;
        }
    }
};
//Cart
const addProductToCart = async (product) => {
    try {
        const response = await API.post(`/cart/`, {
            product
        }, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("addProductToCart", response)
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
const updateProductQuantity = async (shop_order_ids) => {
    try {
        const response = await API.post(`/cart/update`, {
            shop_order_ids
        }, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("updateProductQuantity", response)
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
const deletItemCart = async (productId) => {
    try {
        // console.log("productIdAPI", productId)
        const response = await API.delete(`/cart`,
            {
                headers: {
                    "x-api-key": API_KEY,
                    "x-client-id": USER_ID,
                    "authorization": AUTHORIZATION
                },
                data: {
                    productId: productId
                }
            });
        // console.log("deletItemCart", response);
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
const convertRoleUsertoSeller = async () => {
    try {
        const response = await API.post('/shop/convertRoleUsertoSeller', {}, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        // console.log("convertRoleUsertoSeller", response)
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
//PRODUCTS
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
const findAllProducts = () => {
    return API.get(`/product/`, { headers: { "x-api-key": API_KEY } });
}
const getProductByCategory = (productType) => {
    return API.get(`/product/category`, {
        headers: {
            "x-api-key": API_KEY
        },
        params: {
            product_type: productType
        }
    });
}
const findProduct = (id) => API.get(`/product/${id}`, { headers: { "x-api-key": API_KEY } });
const createProduct = (data) => API.post(`/product/`, { ...data }, { headers: { "x-api-key": API_KEY, "x-client-id": USER_ID, "authorization": AUTHORIZATION } });

const getAllPublishForShop = async () => {
    try {
        const response = await API.get(`/product/published/all`, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("getAllPublishForShop", response)
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
const getAllDraftsForShop = async () => {
    try {
        const response = await API.get(`/product/drafts/all`, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("getAllDraftsForShop", response)
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
const updateProduct = async (brand, material, size, product_name, product_description, product_type, productId) => {
    try {
        const response = await API.patch(`/product/${productId}`, {
            product_attributes: {
                brand: brand,
                material: material,
                size: size,
            },
            product_name: product_name,
            product_description: product_description,
            product_type: product_type
        }, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("updateProduct", response)
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
const publishProductByShop = async (id) => {
    try {
        const response = await API.post(`/product/publish/${id}`, {}, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        // console.log("publishProductByShop", response);
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
const unPublishProductByShop = async (id) => {
    try {
        // console.log(id, "id");
        const response = await API.post(`/product/unpublish/${id}`, {}, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        // console.log("unPublishProductByShop", response);
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

//COMMENTS
const createComment = (id, content, parentCommentId) => {
    return API.post(`/comment`, {
        productId: id,
        content: content,
        parentCommentId: parentCommentId,
    }, {
        headers: {
            "x-api-key": API_KEY,
            "x-client-id": USER_ID,
            "authorization": AUTHORIZATION
        }
    });
}
const getCommentsByParentComment = (id, parentCommentId) => {
    return API.get(`/comment`, {
        headers: {
            "x-api-key": API_KEY
        },
        params: {
            productId: id,
            parentCommentId: parentCommentId
        }
    });
}
//DISCOUNT
const createDiscount = async (dataNewDiscount) => {
    try {
        const response = await API.post(`/discount`, { ...dataNewDiscount }, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        // console.log("createDiscount", response); 
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
const getAllDiscountByShop = async (shopId) => {
    try {
        console.log(shopId, "shopIdXXXXXXXX");
        const response = await API.get(`/discount`, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            },
            params: {
                shopId: shopId,
                limit: 50,
                page: 1
            }
        });
        console.log("getAllDiscountByShop", response)
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

const checkOutReview = async ({ cartId, userId, shop_order_ids }) => {
    try {
        console.log("checkOutReview999")
        const response = await API.post(`/checkout/review`, {
            cartId, userId, shop_order_ids
        }, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("checkOutReview888")
        console.log("checsOutReview", response)
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

const orderByUser = async ({ cartId, userAddress, userPayment, shop_order_ids }) => {
    try {
        const response = await API.post(`/checkout/orderByUser`, {
            cartId, userAddress, userPayment, shop_order_ids
        }, {
            headers: {
                "x-api-key": API_KEY,
                "x-client-id": USER_ID,
                "authorization": AUTHORIZATION
            }
        });
        console.log("orderByUser", response)
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


const cancelDiscount = (id) => API.patch(`/discount/`, { headers: { "x-api-key": API_KEY } });


const handlerRefreshToken = async (formData) => API.post('/shop/handlerRefreshToken', formData, { headers: { "x-api-key": API_KEY } });
const changePassword = async (formData) => API.post('/shop/changePassword', formData, { headers: { "x-api-key": API_KEY } });
const cancellationOfSales = async (formData) => API.post('/shop/cancellationOfSales', formData, { headers: { "x-api-key": API_KEY } });
//SHOP
const addLikedProduct = async (page) => API.post(`/action/shop/addLikedProduct/:id`, { headers: { "x-api-key": API_KEY } });
const updateDiscountService = (newCart) => API.patch('/discount/:discount_id', newCart, { headers: { "x-api-key": API_KEY } });
const getDiscountAmount = (id, updatedPost) => API.post(`/discount/amount`, updatedPost, { headers: { "x-api-key": API_KEY } });
const getAllDiscountWithProduct = (id) => API.get(`/discount/list_product_code`, { headers: { "x-api-key": API_KEY } });
const deleteDiscount = (id) => API.delete(`/discount/`, { headers: { "x-api-key": API_KEY } });




//ADMIN 
// const getAllUsers = async (id) => await API.patch(`/discount/`, { headers: { "x-api-key": API_KEY } });


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
    getProductByCategory,
    createComment,
    getCommentsByParentComment,

    checkOutReview,
    orderByUser,

    //ADMIN
    // getAllUsers
}
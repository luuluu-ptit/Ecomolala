export function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
    // console.log(user, "XX")

    if (user && user.tokens && user.tokens.accessToken) {
        // for Node.js Express back-end
        return { authorization: user.tokens.accessToken };
    } else {
        return {};
    }
}

export function userHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.shop && user.shop._id) {
        // for Node.js Express back-end
        return { clientId: user.shop._id };
    } else {
        return {};
    }
}
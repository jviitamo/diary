function authHeader() {
    // return auth header with jwt if user is logged in and request is to the api url
    let user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.token !== null) {
        return { Authorization: `Bearer ${user.token}` };
    } else {
        return {};
    }
}

export default authHeader
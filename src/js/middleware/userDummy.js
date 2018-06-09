export const userService = {
    login,
    logout,
    userLoggedIn,
    register,
    getById,
    update
};

function login(username, password) {
    const b64Passw = b64EncodeUnicode(password);
    const user = {
        id: 'aa40d8c0-e705-11e7-80c1-9a214cf093ae',
        username: username,
        password: b64Passw,
        fullName:'Fort Perfekt',
        loggedIn: true
    };
    console.log('login',user);
    localStorage.setItem('user', JSON.stringify(user));
    //return user;
    return new Promise((resolve, reject) => {
        if(user) {
            resolve(user);
        } else {
            const error = 'user not logged in';
            reject(error);
        }
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function register(user) {
    let id = '1243';
    if(user) {
        id = '1243';
    }
    return id;
}

function getById(id) {
    let user = localStorage.getItem('user');
    user.id = id; 
    return user;
}

function update(user) {
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

function userLoggedIn() {
    let UserLoggedIn = null;
    if (localStorage.getItem('user')) {
        UserLoggedIn = localStorage.getItem('user');
    }
    return UserLoggedIn;
};

function b64EncodeUnicode(str) {
    // first we use encodeURIComponent to get percent-encoded UTF-8,
    // then we convert the percent encodings into raw bytes which
    // can be fed into btoa.
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
            return String.fromCharCode('0x' + p1);
        }));
};
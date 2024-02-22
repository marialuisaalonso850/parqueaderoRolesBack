function getUserInfo(user){
    return{
        gmail: user.gmail,
        username: user.username,
        id: user.id || user._id,
        role: user.role
    };
};

module.exports = {
    getUserInfo
};
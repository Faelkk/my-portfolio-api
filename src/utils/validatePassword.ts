function validatePassword(password) {
    if (password.length >= 8) {
        return true;
    } else {
        return false;
    }
}

export default validatePassword;

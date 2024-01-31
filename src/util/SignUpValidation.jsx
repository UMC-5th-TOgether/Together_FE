export const validateEmail = (email) => {
    return email
        .toLowerCase()
        .match(/([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/);
};


export const validateBirthdate = (birthdate) => {
    return birthdate.match(/^\d{8}$/);
};


export const validatePw = (pw) => {
    return pw
        .toLowerCase()
        .match(/^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{7,25}$/);
}


export const validateNickname = (nickname) => {
    return nickname
        .toLowerCase()
        .match(/^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|].{1,7}$/)
}

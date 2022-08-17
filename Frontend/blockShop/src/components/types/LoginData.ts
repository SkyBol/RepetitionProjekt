type loginData = {
    username : string | undefined,
    password : string | undefined
}

export default loginData

export const emptyLoginData : loginData = {
    username: undefined,
    password: undefined
}

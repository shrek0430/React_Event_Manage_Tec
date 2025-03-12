import { StatusCodes } from "http-status-codes";
export const token = localStorage.getItem("token");


export const StatusMessage = (data) =>{

    return ([StatusCodes.ACCEPTED, StatusCodes.OK, StatusCodes.CREATED].includes(data))
}

export const Texts = {
    WELCOME_BACK: "Welcome Back!",
    LOGIN_MESSAGE: "Sign in to continue to Velzon.",
    SIGNUP_REDIRECT: "Don't have an account?",
    SIGNUP_LINK: "Signup",
    SIGNIN: "Sign In"
};
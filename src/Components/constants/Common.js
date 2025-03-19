import { StatusCodes } from "http-status-codes";

export const token = localStorage.getItem("token");

export const StatusMessage = (status) => {

    return [
        StatusCodes.OK,           
        StatusCodes.CREATED,      
        StatusCodes.ACCEPTED,     
        StatusCodes.NO_CONTENT,   
    ].includes(status);
};

export const Texts = {
    WelcomeBack: "Welcome Back!",
    LoginMessage: "Sign in to continue to Velzon.",
    SignupRedirect: "Don't have an account?",
    SignupLink: "Signup",
    SignIn: "Sign In",
    Forgot_PassWord:"Forgot Password?",
    EnterEmail:"Enter your email to receive reset instructions.",
    ResetPassword:"Reset Password",
};

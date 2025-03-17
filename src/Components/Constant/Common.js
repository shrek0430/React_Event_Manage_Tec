import { StatusCodes } from "http-status-codes";

export const token = localStorage.getItem("token");

export const StatusMessage = (status) => {
    // Only consider successful and expected statuses
    return [
        StatusCodes.OK,           // 200 - Success
        StatusCodes.CREATED,      // 201 - Resource Created
        StatusCodes.ACCEPTED,     // 202 - Accepted but processing
        StatusCodes.NO_CONTENT,   // 204 - Successful request with no response
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

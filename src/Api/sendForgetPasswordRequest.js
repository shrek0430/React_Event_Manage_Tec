import { ForgotPassword } from "./ApiRoutes";
import ApiService from "./ApiService";
import { UpdatePassword } from "./ApiRoutes";

export const sendForgotPasswordRequest = async (email) => {
    return await ApiService.request(ForgotPassword, "POST", { email });
};

export const setUpdatePassword = async (email) => {
    return await ApiService.request(UpdatePassword,"PUT",{email});
};

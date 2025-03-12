import { Login } from "./ApiRoutes";
import ApiService from "./ApiService";
    

    export const login = async (email, password) => {
    return await ApiService.request(Login, "POST", { email, password });
    };

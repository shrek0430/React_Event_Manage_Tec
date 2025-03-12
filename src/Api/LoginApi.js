    import ApiService from "./ApiService";

    export const login = async (email, password) => {
    return await ApiService.request("/login", "POST", { email, password });
    };

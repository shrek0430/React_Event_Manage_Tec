    export const API_BASE_URL= process.env.REACT_APP_BASE_URL;

    const ApiService = {
    async request(endpoint, method, body = null) {
        try {
        const token = localStorage.getItem("token");

        const headers = {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}` }),
        };

        const options = {
            method,
            headers,
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Request failed");
        }

        return data;
        } catch (error) {
        throw new Error(error.message);
        }
    },
    };

    export default ApiService;

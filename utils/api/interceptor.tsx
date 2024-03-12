import axios from "axios";

const serverAddress = () => {
    return "http://localhost:3004";
};

const instance = axios.create();

instance.defaults.baseURL = serverAddress();
instance.interceptors.response.use(
    function (response) {
        return response;
    },
);

export default instance;
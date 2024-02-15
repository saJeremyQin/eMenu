import axios from "axios";
import auth from "@/firebase";

const fetchClient = (() => {
    const getAuthToken = async () => {
        try {
            return "Bearer " + await auth.currentUser?.getIdToken();
        } catch (error) {
            console.log('getAuthToken ', error);
        }
    };

    const instance = axios.create({
        baseURL:'http://localhost:8000'
        // baseURL:'/'
    });

    instance.interceptors.request.use(async (config) =>{
        config.headers.Authorization = await getAuthToken();
        return config;
    });

    return instance;
})();

export default fetchClient;

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
        baseURL:'/'
    });

    instance.interceptors.request.use(async (config) =>{
        config.headers.Authorization = await getAuthToken();
        return config;
    });

    instance.resetAuthorizationHeader =  async () => {
        const token = await getAuthToken();
        instance.defaults.headers.common['Authorization'] = token;
    }
    return instance;
})();

export default fetchClient;

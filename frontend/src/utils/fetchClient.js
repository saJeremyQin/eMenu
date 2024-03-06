import axios from "axios";
// import auth from "@/firebase";

const fetchClient = (() => {
    // const getAuthToken = async () => {
    //     try {
    //         return "Bearer " + await auth.currentUser?.getIdToken();
    //     } catch (error) {
    //         console.log('getAuthToken ', error);
    //     }
    // };

    const instance = axios.create({
        baseURL:'/'
    });

    instance.interceptors.request.use(async (config) =>{
        // config.headers.Authorization = await getAuthToken();
        const authToken = localStorage.getItem('token');
        if(authToken) {
            console.log('current headers Author is', config.headers.Authorization);
            config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
    });

    return instance;
})();

export default fetchClient;

import axios from "axios";


const api = axios.create({
    baseURL: 'https://apitheproducts.herokuapp.com/api'
});

export default api;
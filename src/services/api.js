import axios from "axios";


const api = axios.create({
    baseURL:'https://sd3-rogeriobastos.herokuapp.com/sales'
});

export default api;
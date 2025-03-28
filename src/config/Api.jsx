import axios from "axios";

const Api = axios.create({
    baseURL:'#',
    headers: {
        'Authorization': '#',
        'Content-Type': 'application/json',
    }
})

export default Api;
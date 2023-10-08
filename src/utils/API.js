import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:3001/",
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
});

export default API;

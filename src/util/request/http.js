import axios from "axios";
import store from "../../redux/store.js";


// 配置全局默认的、共同的 axios 属性

axios.defaults.baseURL = "http://localhost:8000";

// axios.defaults.headers = ""

axios.interceptors.request.use(function (config) {
    store.dispatch({ type: "change-spin",next:true })
    return config;
}, function (err) {
    return Promise.reject(err);
})

axios.interceptors.response.use(function (response) {
    store.dispatch({ type: "change-spin" ,next:false})
    return response;
}, function (err) {
    return Promise.reject(err);
})

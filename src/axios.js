import axios from "axios";

axios.defaults.baseURL = 'https://fastglobeit.de:8090/auth'
axios.defaults.headers.common['Authorization'] = 'Bearer' + localStorage.getItem('token')

import axios from 'axios';

export default axios.create({
    baseURL: 'postgres://postgres:3246908Nwt89@localhost:5432/bookify'
})
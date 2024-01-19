import axios from 'axios';

export default axios.create({
    baseURL: 'postgres://postgres:DaisyMae112022@localhost:5432/bookify'
})
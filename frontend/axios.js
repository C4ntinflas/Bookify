import axios from 'axios';

export default axios.create({
    baseURL: 'postgres://postgres:Jonarjon12@localhost:5432/bookify'
})
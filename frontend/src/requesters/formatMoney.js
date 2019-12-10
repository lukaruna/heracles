const axios = require('axios');
const adapter = require('axios/lib/adapters/http');
const env = require('../env')
const {port, baseUrl} = env

const formatMoney = ({value}) => axios.request({
    method: 'POST',
    url: '/formatMoney',
    baseURL: `${baseUrl}:${port}`,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json; charset=utf-8'
    },
    data: {
        value
    }
}, adapter)

module.exports = { formatMoney }
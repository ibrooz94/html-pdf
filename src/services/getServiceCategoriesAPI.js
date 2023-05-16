import axios from 'axios'
import getAccessToken from '../store/checker'
import store from '../store/authStore'


const todoitems = axios.create({
    baseURL: 'https://localhost:7164/api/todoitems',
    json: true
})


const weathercalls = axios.create({
    baseURL: 'https://localhost:7164/weatherforecast',
    json: true
})


export default {
    async executeSC(method, resource, data) {
        if (store.state.accessToken == '') {
            var accessToken = await getAccessToken.getAccessToken()
        }
        return todoitems({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(req => {
                return req.data
            })

    },

    async executeSCD(method, resource, data) {
        if (store.state.accessToken == '') {
            var accessToken = await getAccessToken.getAccessToken()
        }
        return weathercalls({
            method,
            url: resource,
            data,
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        })
            .then(req => {
                return req.data
            })
    },

    getAll() {
        return this.executeSC('get', '/')
    },

    getById(id) {
        return this.executeSC('get', `/${id}`)
    },
    create(data) {
        return this.executeSC('post', '/', data)
    },
    update(data) {
        return this.executeSC('put', data)
    },



    getAll2() {
        return this.executeSCD('get', '/')
    },

}
import axios from 'axios';

const baseURL = "http://localhost:3000/api/v1";

axios.defaults.withCredentials = true;

export const loginPOST = (login,password) => {
    return axios.post(baseURL+"/login",
    {
        login,
        password
    })
}

export const meGET = () => {
    return axios.get(baseURL+"/me")
}

export const logoutPOST = () => {
    return axios.post(baseURL+"/logout")
}

export const usersGET = () => {
    return axios.get(baseURL+"/users")
}

export const getTodos = () => {
    return axios.get(baseURL+"/todos")
}

export const addTodo = (data) => {
    return axios.post(baseURL+"/todos", data)
}

export const editTodo = (id, data) => {
    return axios.put(baseURL+`/todos/${id}`, data)
} 

export const delTodo = (id) => {
    return axios.delete(baseURL+`/todos/${id}`)
}

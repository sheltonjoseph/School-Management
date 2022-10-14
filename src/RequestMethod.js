import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";

// const user = JSON.parse(localStorage.getItem("persist:root"))
// const currentUser = user && JSON.parse(user).currentUser;


// to create publicconnection with backend
const TOKEN = localStorage.getItem("token")

console.log(TOKEN)

export const SignupRequest = axios.create({
    baseURL : BASE_URL,
})

export const userRequest = axios.create({
    baseURL : BASE_URL,
    headers: { token: `Bearer ${TOKEN}` },
})

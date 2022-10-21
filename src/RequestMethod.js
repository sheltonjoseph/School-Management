import axios from "axios";
const BASE_URL = "http://localhost:5000/api/";
const ATTMARK_URL = "http://localhost:3001/api/";

// const user = JSON.parse(localStorage.getItem("persist:root"))
// const currentUser = user && JSON.parse(user).currentUser;


// to create publicconnection with backend
export const SignupRequest = axios.create({
    baseURL : BASE_URL,
})

export const Attendence = axios.create({
    baseURL : ATTMARK_URL,
})

export const userRequest = () => {
    const TOKEN = localStorage.getItem("token")
    console.log(TOKEN)
    
    return axios.create({
        baseURL : BASE_URL,
        headers: { token: `Bearer ${TOKEN}` },
    })
}

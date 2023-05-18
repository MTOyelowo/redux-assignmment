import axios from 'axios'
import { UserDetails, LoginDetails } from "../../../../utils/types"

const API_URL = "http://localhost:5000/api/users"

// Register user
const register = async (userData: UserDetails) => {
    const response = await axios.post(API_URL, userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Login user
const login = async (loginData: LoginDetails) => {
    const response = await axios.post(API_URL + 'login', loginData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }

    return response.data
}

// Logout user
const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    register,
    logout,
    login,
}

export default authService;

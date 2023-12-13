 import axios from "axios";
 import {useState} from "react";
 import {useNavigate} from "react-router-dom";

const AuthUser = () => {
    const navigate = useNavigate();

    const getToken = () => {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken
    }



    const getUser = () => {
        const userString = sessionStorage.getItem('user');
        return  JSON.parse(userString);
    }

    const [token, setToken] = useState(getToken());
    const [user, setUser] = useState(getUser());

    const saveToken = (user,token) => {
        sessionStorage.setItem('token', JSON.stringify(token));
        sessionStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        setToken(token);

        navigate('/address-book');
    }

    const http  = axios.create({
        baseURL: `${process.env.REACT_APP_BASE_URL}api`,
        headers: {
            "Content-type": "application/json"
        }
    });

    http.interceptors.request.use((config) => {
        const tokenString = sessionStorage.getItem('token')
        const userToken = JSON.parse(tokenString);
        config.headers.Authorization = `Bearer ${userToken}`
        return config;
    })

    const logout = () => {
        sessionStorage.clear()
        navigate('/login');
    }

    return {
        setToken: saveToken,
        token,
        user,
        getToken,
        http,
        logout
    };
};

export default AuthUser;
import React, {useState} from 'react';
import AuthUser from "../Components/AuthUser";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {
    const navigate = useNavigate();
    const {http,setToken} = AuthUser();


    const [email,setEmail] = useState();
    const [password,setPassword] = useState()

    const handleSubmit = (e) => {
        e.preventDefault();

        http.post('/login',{
            email: email,
            password: password
        }).then(res => {
            console.log(res)
            setToken(res.data.user,res.data.access_token)
        }).catch(err => {
            console.log(err)
            const response = err.response;
            if (response && response.status === 422) {
                if (response.data?.errors) {
                    const errors = response.data.errors;
                    for (const key in errors) {
                        console.log(errors[key][0])
                        toast.error(errors[key][0]);
                    }
                }
            }
             toast.error(response?.data?.error)
        })
    }
    return (
    <>
        <div className="main-body ">
        <div className="login-container">
            <h2 className="mb-4">Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           placeholder="Enter your Email"
                           onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Enter your password"
                           onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Login</button>
            </form>
        </div>
        </div>
    </>
    );
};

export default Login;
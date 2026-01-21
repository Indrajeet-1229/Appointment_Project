import React, { createContext, useEffect, useState } from 'react';
import { toast } from "react-toastify";
import api from "../utils/api";
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {

    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
        user: null
    });

    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();


    useEffect(() => {
        const token = getLocalStorage('token');
        const user = getLocalStorage('user');

        if (token && user) {
            setIsAuth({
                isAuthenticated: true,
                user
            });
        }

        setLoading(false);
    }, []);


    const handleRegistation = async (e, registerInfo) => {
        e.preventDefault();

        const { name, email, password, cpassword } = registerInfo;

        if (!name || !email || !password || !cpassword) {
            return toast.error("All fields are required");
        }

        if (password !== cpassword) {
            return toast.error("Password doesn't match");
        }

        try {
            const { data } = await api.post("/auth/register", {
                name, email, password, cpassword
            });

            if (data.success) {
                setLocalStorage("token", data.token);
                setLocalStorage("user", data.user);

                setIsAuth({
                    isAuthenticated: true,
                    user: data.user
                });

                toast.success(data.message);
                navigate('/dashboard');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleLogin = async (e, loginInfo) => {
        e.preventDefault();

        const { email, password } = loginInfo;

        if (!email || !password) {
            return toast.error("All fields are required");
        }

        try {
            const { data } = await api.post("/auth/login", { email, password });

            if (data.success) {
                setLocalStorage("token", data.token);
                setLocalStorage("user", data.user);

                setIsAuth({
                    isAuthenticated: true,
                    user: data.user
                });

                toast.success(data.message);
                navigate('/dashboard');
            }

        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setIsAuth({
            isAuthenticated: false,
            user: null
        });
        toast.success("Logout Succefully");
        navigate('/login')


    }



    const setLocalStorage = (key, value) => {
        if (key === "token") {
            localStorage.setItem(key, value);
        } else {
            localStorage.setItem(key, JSON.stringify(value));
        }
    };

  const getLocalStorage = (key) => {
    if (key === "token") {
        return localStorage.getItem(key);
    }
    return JSON.parse(localStorage.getItem(key)); 
};

    return (
        <AuthContext.Provider value={{ isAuth, handleLogout, handleLogin, handleRegistation, loading, }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

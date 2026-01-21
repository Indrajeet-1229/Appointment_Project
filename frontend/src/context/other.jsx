import React, { createContext, useEffect, useState } from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import api from "../utils/api"
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext()
const AuthProvider = ({ children }) => {

    const [allUsers, setAllUsers] = useState(null);
    const [userData, setUserData] = useState(null);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isLogin, setIsLogin] = useState(false);
    const [isAuth, setIsAuth] = useState({
        isAuthenticated: false,
    user: null
    });

    const naviagate=useNavigate()

    useEffect(() => {
        fetchAllUsers();
        const loggedUser = getLocalStorage("loggedUser");

        if (loggedUser && loggedUser.length > 0) {
            setLoggedUserId(loggedUser);

        }
        else {
            setLoggedUserId("")
        }


    }, [])

    useEffect(() => {
        if (loggedUserId && allUsers && allUsers.length > 0) {
            const existUser = allUsers.find((user) => user.email === loggedUserId);
            setUserData(existUser);
            setIsLogin(true);
        }

    }, [loggedUserId, allUsers]);


    const deleteUser = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "Do you really want to delete this user? This action cannot be undone!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.delete(`https://ems-full-stack.onrender.com/auth/api/deleteuser/${id}`);
                    toast.success(response.data.message);
                    fetchAllUsers();

                } catch (error) {
                    console.error("Delete error:", error);
                    toast.error("Something went wrong while deleting the user.");
                }
            }
        });
    };



    const updateUser = async (updatedUser) => {
        try {
            const response = await axios.put(`https://ems-full-stack.onrender.com/auth/api/updateuser/${updatedUser._id}`, updatedUser);
            const { data } = response;
            setUserData(data);

            const updateUers = await allUsers.map((user) => {
                return user.email === data.email ? data : user;

            });
            setAllUsers(updateUers);
        }
        catch (error) {
            console.error("Error updating user:", error.message);
            toast.error("Failed to update user!");
        }
    }



    const fetchAllUsers = async () => {
        try {
            const response = await axios.get("https://ems-full-stack.onrender.com/auth/api/allusers");
            setAllUsers(response.data)
        } catch (error) {
            console.error("Error fetching users:", error.message);
        }
    }


    const handleRegistation = async (e, registerInfo) => {
        e.preventDefault();
        const { name, email, password, cpassword } = registerInfo;
        if (!name || !email || !password || !cpassword) {
            return toast.error("All fields are required");
        }
        if (password !== cpassword) {
            return toast.error("Password dosen't match");
        }

        try {
            const response = await api.post("/register", { name, email, password });
            const { success, message, token, newUserData } = response.data;

            if (success) {
                toast.success(message);
                localStorage.setItem("token", token);
                localStorage.setItem("loggedInUser", newUserData.name);
                setIsAuth({
                    isLogged: true,
                    user: newUserData
                });
                naviagate('/EmployeeDashboard')
            }

        }
        catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);

            console.log(error)
        }

    }
    const handleLogin = async (e, loginInfo) => {
        e.preventDefault();
        const {  email, password } = loginInfo;
        if ( !email || !password ) {
            return toast.error("All fields are required");
        }

        try {
            const response = await api.post("/login", { email, password });
            const { success, message, token, user } = response.data;

            if (success) {
                toast.success(message);
                localStorage.setItem("token", token);
                localStorage.setItem("loggedInUser", user.name);
                setIsAuth({
                    isLogged: true,
                    user
                });
                naviagate('/EmployeeDashboard')
            }

        }
        catch (error) {
            const message = error.response?.data?.message || "Something went wrong";
            toast.error(message);

            console.log(error)
        }

    }

    const adminLogin = (email) => {

        setLocalStorage("loggedUser", email);
        setIsLogin(true);
        setLoggedUserId(email);
        toast.success("Login Successful!");

    }
    const logout = () => {
        setIsLogin(false);
        localStorage.removeItem("loggedUser");
        setLoggedUserId("");
        setUserData(null)
        toast.success("Logout Successful!");

    }

    const setLocalStorage = (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
    }
    const getLocalStorage = (key) => {
        return JSON.parse(localStorage.getItem(key));
    }
    return (
        <div>
            <AuthContext.Provider value={{ handleRegistation, handleLogin, isAuth }}>

                {children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;
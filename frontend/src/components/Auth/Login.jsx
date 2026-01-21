import React, { useContext, useEffect, useState, useNavigate } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import { Eye, EyeOff } from 'lucide-react';
import "react-toastify/dist/ReactToastify.css";


const Login = () => {
    const [loginInfo, setLoginInfo] = useState({
        email: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);

    const { handleLogin } = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginInfo((prev) => ({ ...prev, [name]: value }))
    }

   
    return (
        <>
            <div className='flex h-screen w-screen items-center justify-center px-4'>
                <div className='border-2 rounded-xl border-emerald-600 p-10 md:p-16 lg:p-20 w-full max-w-md'>
                    <h2 className='text-2xl font-bold text-center text-emerald-600 mb-6'>User Login </h2>
                    <form onSubmit={(e) => handleLogin(e, loginInfo)} className='flex flex-col items-center justify-center'>

                        <input
                            value={loginInfo.email}
                            name="email"
                            onChange={handleChange}
                            required
                            className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                            type="email"
                            placeholder='Email Address*'
                        />


                        <div className='relative w-full mt-3'>
                            <input
                                value={loginInfo.password}
                                name="password"
                                onChange={handleChange}
                                required
                                className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 pr-12 rounded-full placeholder:text-gray-400'
                                type={showPassword ? "text" : "password"}
                                placeholder='Password*'
                            />
                            <button
                                type="button"
                                className="absolute right-4 top-2.5 text-gray-500"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                            </button>
                        </div>

                        <button
                            className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full'>
                            Login
                        </button>

                        <p className='text-blue-600 mt-2 cursor-pointer text-sm md:text-base'>
                            <Link to="/register">New User? Sign Up</Link>
                        </p>
                    </form>

                    <button
                        type="button"

                        className='mt-6 text-white w-full'>
                        <Link className='border-none  outline-none hover:bg-red-700 font-semibold bg-red-600 text-lg py-2 px-8  rounded-full' to="/adminlogin"> Admin Panel Login</Link>
                    </button>
                </div>
            </div>
        </>
    )
}

export default Login;

import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'
import { AuthContext } from '../../context/AuthProvider';


const Registation = () => {
    
    const { handleRegistation } = useContext(AuthContext);
    
    const [registerInfo, setRegisterInfo] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''

    })
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setRegisterInfo((prev) => (
            {
                ...prev, [name]: value
            }
        ))
    }


    return (
        <div className='flex h-screen w-screen items-center justify-center px-4'>
            <div className='border-2 rounded-xl border-emerald-600 p-10 md:p-16 lg:p-20 w-full max-w-md'>
                <h2 className='text-2xl font-bold text-center text-emerald-600 mb-6'>Register an Account</h2>
                <form onSubmit={(e) => handleRegistation(e, registerInfo)} className='flex flex-col items-center justify-center'>
                    <input
                        value={registerInfo.name}
                        name="name"
                        onChange={handleChange}
                        required
                        className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400'
                        type="text"
                        placeholder='Full Name*'
                    />
                    <input
                        value={registerInfo.email}
                        name="email"
                        onChange={handleChange}
                        required
                        className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400'
                        type="email"
                        placeholder='Email Address*'
                    />


                    <div className='relative w-full mt-3'>
                        <input
                            value={registerInfo.password}
                            name="password"
                            onChange={handleChange}
                            minLength={3}
                            required
                            className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 pr-12 rounded-full placeholder:text-gray-400'
                            type={showPassword ? "text" : "password"}
                            placeholder='Password*'
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>


                    <div className='relative w-full mt-3'>
                        <input
                            value={registerInfo.cpassword}
                            name="cpassword"
                            onChange={handleChange}
                            required
                            className='w-full outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 pr-12 rounded-full placeholder:text-gray-400'
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder='Confirm Password*'
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <EyeOff size={22} /> : <Eye size={22} />}
                        </button>
                    </div>


                    <button className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full'>
                        Register
                    </button>
                    <p className='text-blue-600 mt-2 cursor-pointer text-sm md:text-base'>
                        <Link to="/login">Already have an account? Log in</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Registation;

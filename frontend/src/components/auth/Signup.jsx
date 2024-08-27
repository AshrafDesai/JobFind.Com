import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Button } from '../ui/button';

const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const {loading} = useSelector(store=>store.auth);
    const dispatch = useDispatch();
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!input.fullname) newErrors.fullname = "Full name is required";
        if (!input.email) newErrors.email = "Email is required";
        if (!input.phoneNumber) newErrors.phoneNumber = "Phone number is required";
        if (!input.password) newErrors.password = "Password is required";
        if (!input.role) newErrors.role = "Role is required";
        return newErrors;
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});

        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("password", input.password);
        formData.append("role", input.role);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/register`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );
            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.error(error);
            toast.error("An error occurred during signup");
        }
        finally{
            dispatch(setLoading(false));
        }
    };

    return (
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
            <form onSubmit={submitHandler} className='w-full max-w-md border border-gray-200 rounded-md p-6 bg-white shadow-lg'>
                <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fullname" className="block text-gray-700">Full Name</Label>
                        <input
                            name="fullname"
                            type="text"
                            value={input.fullname}
                            onChange={changeEventHandler}
                            placeholder="Full Name"
                            className={`border ${errors.fullname ? 'border-red-500' : 'border-gray-300'} p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-gray-700">Email</Label>
                        <input
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="E-mail"
                            className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</Label>
                        <input
                            name="phoneNumber"
                            type="tel"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="+91"
                            className={`border ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'} p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="block text-gray-700">Password</Label>
                        <input
                            name="password"
                            type="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className={`border ${errors.password ? 'border-red-500' : 'border-gray-300'} p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    </div>
                    <div className='space-y-4'>
                        <div className="flex flex-col space-y-2">
                            <Label className="block text-gray-700 font-bold">Role</Label>
                            <RadioGroup className="flex flex-col space-y-2" name="role" defaultValue="student">
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="student"
                                        id="r1"
                                        checked={input.role === 'student'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r1" className='font-bold'>Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="role"
                                        value="recruiter"
                                        id="r2"
                                        checked={input.role === 'recruiter'}
                                        onChange={changeEventHandler}
                                        className="cursor-pointer"
                                    />
                                    <Label htmlFor="r2" className='font-bold'>Recruiter</Label>
                                </div>
                            </RadioGroup>
                            {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                        </div>
                        <div className='flex items-center space-x-2 mb-6'>
                            <Label htmlFor="profile" className="text-gray-700 font-medium">Profile</Label>
                            <input
                                id="profile"
                                accept="image/*"
                                type="file"
                                onChange={changeFileHandler}
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Signup</Button>
                    }
                    <div className="text-center mt-4">
                        <span className="text-gray-700">Already have an account? <Link to='/login' className="text-blue-600 hover:underline">Login</Link></span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;

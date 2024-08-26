import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
const Signup = () => {
    const [input, setInput] = useState({
        fullname: "",
        email: "",
        phoneNumber: "",
        password: "",
        role: "",
        file: ""
    });
    const navigate = useNavigate();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
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
            }
        } catch (error) {
            console.error(error); 
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
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-gray-700">Email</Label>
                        <input
                            name="email"
                            type="email"
                            value={input.email}
                            onChange={changeEventHandler}
                            placeholder="E-mail"
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</Label>
                        <input
                            name="phoneNumber"
                            type="tel"
                            value={input.phoneNumber}
                            onChange={changeEventHandler}
                            placeholder="+91"
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="block text-gray-700">Password</Label>
                        <input
                            name="password"
                            type="password"
                            value={input.password}
                            onChange={changeEventHandler}
                            placeholder="Password"
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
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
                    <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Signup</button>
                    <div className="text-center mt-4">
                        <span className="text-gray-700">Already have an account? <Link to='/login' className="text-blue-600 hover:underline">Login</Link></span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Signup;
import React from 'react';
import { Label } from '@radix-ui/react-label';
import { RadioGroup, RadioGroupItem } from '@radix-ui/react-radio-group';
import { Link } from 'react-router-dom';

const Signup = () => {
    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Sign Up</h1>
                    <div className="my-2">
                        <Label htmlFor="fullName" className="block text-gray-700">Full Name</Label>
                        <input
                            id="fullName"
                            type="text"
                            placeholder="Full Name"
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className="block text-gray-700">Email</Label>
                        <input
                            id="email"
                            type="email"
                            placeholder="E-mail"
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phoneNumber" className="block text-gray-700">Phone Number</Label>
                        <input
                            id="phoneNumber"
                            type="tel"
                            placeholder="+91"
                            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="block text-gray-700">Password</Label>
                        <input
                            id="password"
                            type="password"
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
                                className="cursor-pointer"
                            />
                        </div>
                    </div>
                    <br></br>
                    <button type="submit" className="w-full bg-black text-white p-3 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">Signup</button>
                    <div className="text-center mt-4">
                        <span className="text-gray-700">Already have an account? <Link to='/login' className="text-blue-600 hover:underline">Login</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;

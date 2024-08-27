import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';

const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const {loading} = useSelector(store=>store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        
        console.log("Login data received on frontend:", input);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(
                `${USER_API_END_POINT}/login`,
                input,
                {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                }
            );

            if (res.data.success) {
                navigate("/Home");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error(error);
        }
        finally{
            dispatch(setLoading(false));
        }
    };

    return (
        <div>
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    
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
                    <br></br>
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
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4">Login</Button>
                    }
                    
                    <div className="text-center mt-4">
                        <span className="text-gray-700">Don't have an account? <Link to='/signup' className="text-blue-600 hover:underline">Signup</Link></span>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;

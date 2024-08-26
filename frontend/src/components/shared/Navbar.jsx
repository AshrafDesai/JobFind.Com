import React from 'react';
import { Link } from 'react-router-dom'; 
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button } from "../ui/button"; 
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
    const user = false;

    return (
        <div className="bg-white">
            <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
                <div>
                    <h1 className="text-2xl font-bold">JobFind<span className="text-[#F83002]">.Com</span></h1>
                </div>
                <div className="flex items-center gap-12">
                    <ul className="flex font-medium items-center gap-5">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/jobs">Jobs</Link></li>
                        <li><Link to="/browse">Browse</Link></li>
                    </ul>
                    {!user ? (
                        <div className="flex items-center gap-2">
                            <Link to='/login'><Button variant="outline">Login</Button></Link>
                            <Link to='/signup'><Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">Signup</Button></Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <div className="rounded-full overflow-hidden h-10 w-10 cursor-pointer">
                                    <img
                                        src="https://github.com/shadcn.png"
                                        alt="@shadcn"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 bg-white shadow-lg rounded-lg">
                                <div className="flex items-center gap-4">
                                    <div className="rounded-full overflow-hidden h-10 w-10">
                                        <img
                                            src="https://github.com/shadcn.png"
                                            alt="@shadcn"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <h4 className="font-medium">Desai InfoTech Solution Pvt Ltd</h4>
                                        <p className="text-sm text-gray-500">
                                            Welcome to Desai Infotech Solution Pvt Ltd, your Enterprises Solution Provider
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-col my-2 text-gray-600">
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <User2 />
                                        <Button variant="link">View Profile</Button>
                                    </div>
                                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                                        <LogOut />
                                        <Button variant="link">Logout</Button>
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

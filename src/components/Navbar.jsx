"use client";

import Image from "next/image";
import { useState } from "react";

export default function Navbar({ userName, userEmail, userImage }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-gray-100 shadow-md">
            {/* App Title */}
            <div className="text-2xl font-bold">
                Food Planner
            </div>

            {/* Profile Picture + Hover Card */}
            <div 
                className="relative"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <Image
                    src={userImage}
                    alt="User Avatar"
                    width={40}
                    height={40}
                    className="rounded-full cursor-pointer"
                />

                {isHovered && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-4">
                        <p className="font-semibold">{userName}</p>
                        <p className="text-sm text-gray-600">{userEmail}</p>
                    </div>
                )}
            </div>
        </nav>
    );
}
"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import SignOutButton from "./SignOutButton";
import { Button } from "@/components/ui/button";

export default function Navbar({ userName, userEmail, userImage }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <nav className="bg-[#5d8f54] shadow-md px-6 py-4 flex justify-between items-center text-white">
            {/* App Title */}
            <div className="text-2xl font-bold">
                Food Planner
            </div>

            <div className="flex items-center space-x-8">
                <Link href="/account">
                    <Button
                    variant="ghost"
                        className="px-4 py-2 rounded font-medium bg-white text-[#2f5d24] hover:bg-gray-100"
                >
                    Account Preferences
                    </Button>
                </Link>

                <SignOutButton />
           

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
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-md shadow-lg p-4 border border-gray-200">
                        <p className="font-semibold text-gray-800">{userName}</p>
                        <p className="text-sm text-gray-600">{userEmail}</p>
                    </div>
                )}

            </div>
           </div>     
        </nav>
    );
}
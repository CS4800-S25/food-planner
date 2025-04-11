"use client";

import { useState } from "react"; //to create input states
import Link from "next/link";

function LoginPage() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault(); // to prevent browser's full page reload on submit

        try {

            // connecting to backeend logic here
            // POST request
            // Authenticating the user
            
            console.log("Trying to log in with:", email, password);
        } catch (error) {
            console.error("Login error:", error);
        }
    };

    

    return (
        
            <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
              {/* Centered form card */}
              <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Log in to Food Planner</h1>
        
                <form onSubmit={handleLogin} className="space-y-4">
                  {/* Email Field */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 p-2 rounded"
                      value={email}                         // Controlled input: reflects state
                      onChange={(e) => setEmail(e.target.value)} // Update state when typing
                      required
                    />
                  </div>
        
                  {/* Password Field */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <input
                      type="password"
                      className="w-full border border-gray-300 p-2 rounded"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
        
                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
                  >
                    Log In
                  </button>
                </form>
        
                {/* Links */}
                <div className="flex justify-between mt-4 text-sm">
                  <Link href="/forgot-password" className="text-blue-600 hover:underline">
                    Forgot password?
                  </Link>
                  <Link href="/create-account" className="text-blue-600 hover:underline">
                    Create Account
                  </Link>
                </div>
              </div>
            </main>
        );
    


}
"use client";

import { useState } from "react"; //to create input states
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader,CardTitle,CardContent,CardFooter,} from "@/components/ui/card";

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
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl">
              Log in to Food Planner
            </CardTitle>
          </CardHeader>
  
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className="w-full border border-gray-300 p-2 rounded"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
              <Button type="submit" variant="default" className="w-full">
                Log In
              </Button>
            </form>
          </CardContent>
  
          <CardFooter className="flex justify-between text-sm">
            <Link href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot password?
            </Link>
            <Link href="/create-account" className="text-blue-600 hover:underline">
              Create Account
            </Link>
          </CardFooter>
        </Card>
      </main>
    );
    


}

export default LoginPage;
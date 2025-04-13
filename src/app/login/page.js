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
        
        <main className="min-h-screen flex items-center justify-center bg-rose-50 p-6">
        <Card className="w-full max-w-xl bg-white/90 border-2 border-rose-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-rose-600">
              Log in to Food Planner
            </CardTitle>
          </CardHeader>
  
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Email Field */}
              <div>
                <label className="block text-sm font-medium mb-1 text-rose-700">Email</label>
                <input
                  type="email"
                  className="w-full border border-rose-200 p-3 rounded-lg bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
  
              {/* Password Field */}
              <div>
                <label className="block text-sm font-medium mb-1 text-rose-700">Password</label>
                <input
                  type="password"
                  className="w-full border border-rose-200 p-3 rounded-lg bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
  
              {/* Submit Button */}
              <Button type="submit" variant="default" className="w-full bg-rose-500 hover:bg-rose-600 text-white">
                Log In
              </Button>
            </form>
          </CardContent>
  
          <CardFooter className="flex justify-between text-sm">
            <Link href="/forgot-password" className="text-rose-500 hover:underline">
              Forgot password?
            </Link>
            <Link href="/create-account" className="text-rose-500 hover:underline">
              Create Account
            </Link>
          </CardFooter>
        </Card>
      </main>
    );
    


}

export default LoginPage;
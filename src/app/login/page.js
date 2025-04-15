"use client";

import { useState, useEffect } from "react"; //to create input states
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader,CardTitle,CardContent,CardFooter,} from "@/components/ui/card";

function LoginPage() {

    const tagLines = [
      "Plan Meals Smarter",
      "Your Weekly Meals, Made Easy",
      "Organize. Shop. Eat Well."
    ];

    const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTaglineIndex((prev) => (prev +1) % tagLines.length);
      }, 1500);
      return () => clearInterval(interval);
    }, []);


    const handleGoogleSignIn = () => {
        SignIn("google", { callbackUrl: "/"});

    };

    

    return (
        
        <main className="min-h-screen flex items-center justify-center bg-rose-50 p-6">
        <Card className="w-full max-w-3xl bg-white/90 border-2 border-rose-100 shadow-lg p-20">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-rose-600">
            Welcome to Food Planner
            </CardTitle>
          </CardHeader>
  
          <CardContent className="space-y-6">
              {/* Tagline */} 
            
              <div className="text-center text-rose-500 text-base font-medium min-h-[24px] transition-opacity duration-500 ease-in-out">
                {tagLines[currentTaglineIndex]}
              </div>
            
              {/* Google sign in button */}
              <Button
                onClick = { handleGoogleSignIn }
                className="w-full bg-rose-500 hover:bg-rose-600 text-white">

                Sign In with Google

            </Button>


          </CardContent>
            
        </Card>
      </main>
    );
    


}

export default LoginPage;
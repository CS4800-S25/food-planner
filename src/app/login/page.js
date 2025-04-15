"use client";

import { useState } from "react"; //to create input states
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader,CardTitle,CardContent,CardFooter,} from "@/components/ui/card";

function LoginPage() {

    //const [email, setEmail] = useState("");
    //const [password, setPassword] = useState("");

    const handleGoogleSignIn = () => {
        SignIn("google", { callbackUrl: "/"});

    };

    

    return (
        
        <main className="min-h-screen flex items-center justify-center bg-rose-50 p-6">
        <Card className="w-full max-w-xl bg-white/90 border-2 border-rose-100 shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-rose-600">
            Welcome to Food Planner
            </CardTitle>
          </CardHeader>
  
          <CardContent className="space-y-6">
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
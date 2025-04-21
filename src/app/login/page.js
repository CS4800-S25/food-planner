"use client";

import { useState, useEffect } from "react"; //to create input states
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
    const tagLines = [
        "Plan Meals Smarter",
        "Your Weekly Meals, Made Easy",
        "Organize. Shop. Eat Well.",
    ];

    const [currentTaglineIndex, setCurrentTaglineIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTaglineIndex((prev) => (prev + 1) % tagLines.length);
        }, 2000);
        return () => clearInterval(interval);
    }, [tagLines.length]);

    const handleGoogleSignIn = () => {
        signIn("google", { callbackUrl: "/" });
    };

    const { status } = useSession();
    const params = useSearchParams();
    const message = params.get("message");
    const router = useRouter();

    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        if (status === "unauthenticated" && message === "signedout") {
            setShowMessage(true);

            const timer = setTimeout(() => {
                setShowMessage(false);

                router.replace("/login");
            }, 2000);

            return () => clearTimeout(timer); // cleanup if unmounted
        }
    }, [status, message, router]);
    return (
        <main
            className="min-h-screen flex items-start justify-center pt-36 p-6 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/background.png')" }}
        >
            <Card className="w-full max-w-3xl bg-white border-2 border-lime-100 shadow-xl p-20">
                <CardHeader>
                    <CardTitle className="text-center text-3xl text-green-700 font-semibold">
                        Welcome to Food Planner
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Tagline */}

                    <div className="text-center text-lime-700 text-base font-medium min-h-[24px] transition-opacity duration-500 ease-in-out">
                        {tagLines[currentTaglineIndex]}
                    </div>

                    {/* Google sign in button */}
                    <Button
                        onClick={handleGoogleSignIn}
                        className="w-full bg-lime-500 hover:bg-lime-600 text-white"
                    >
                        Sign In with Google
                    </Button>

                    {showMessage && (
                        <p className="text-green-700 text-center font-medium mb-4">
                            You&apos;ve been signed out successfully.
                        </p>
                    )}
                </CardContent>
            </Card>
        </main>
    );
}

export default LoginPage;

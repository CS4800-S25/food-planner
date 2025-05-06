"use client";
import GenerateMealLogic from "./GenerateMealLogic";
import MealsCarousel from "./MealsCarousel";
import Navbar from "@/components/Navbar";

export default function HomepageContent({ meals, email, session }) {
    return (
        <main className="min-h-screen bg-[#fcfbf7]">
            <div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: "url('/images/homepage.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: 0.2, // only image affected
                }}
            />
            <div className="relative z-10">
                <Navbar
                    userName={session.user.name}
                    userEmail={session.user.email}
                    userImage={session.user.image}
                />

                <div className="px-6 py-10">
                    <h1 className="text-3xl font-bold mb-6 text-center">
                        Your Saved Meals
                    </h1>

                    <GenerateMealLogic meals={meals} email={email} />

                    <MealsCarousel meals={meals} />
                </div>
            </div>
        </main>
    );
}

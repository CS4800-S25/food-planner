import Link from "next/link";
//import Image from "next/image";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";
import GenerateMealLogic from "./GenerateMealLogic";
//import MealCard from "@/components/MealCard";
//import Meals from "./Meals";
import Navbar from "@/components/Navbar";
import MealsCarousel from "@/components/MealsCarousel";





export default async function HomePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    

    return (
        <main className="flex flex-col min-h-screen">
            {/* Top Navbar */}
            <Navbar
                userName={session.user.name}
                userEmail={session.user.email}
                userImage={session.user.image}
            />

            {/* Main Content */}
            <div className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Saved Meals</h1>

                <GenerateMealLogic email={session.user.email} />
                {/* Carousel */}
                <MealsCarousel  email={session.user.email} />

                {/* Update Preferences and Sign Out */}
                <div className="mt-10 flex flex-col items-center">
                    <Link href="/account">
                        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg mb-4">
                            Update Preferences
                        </button>
                    </Link>

                    <SignOutButton />
                </div>
            </div>
        </main>
    );
}

//export default HomePage;

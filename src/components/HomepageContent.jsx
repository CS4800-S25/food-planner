import Link from "next/link";
import SignOutButton from "./SignOutButton";
import GenerateMealLogic from "./GenerateMealLogic";
import MealsCarousel from "./MealsCarousel";
import Navbar from "@/components/Navbar";

export default function HomepageContent({ meals, email, session }) {
    return (
        <main className="flex flex-col min-h-screen">
            <Navbar
                userName={session.user.name}
                userEmail={session.user.email}
                userImage={session.user.image}
            />

            <div className="flex-1 container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-6 text-center">Your Saved Meals</h1>

                <GenerateMealLogic meals={meals} email={email} />
                <MealsCarousel meals={meals} />

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

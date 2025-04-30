//import Link from "next/link";
//import Image from "next/image";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
//import SignOutButton from "./SignOutButton";
//import GenerateMealLogic from "./GenerateMealLogic";
//import MealCard from "@/components/MealCard";
//import Meals from "./Meals";
//import Navbar from "@/components/Navbar";
//import MealsCarousel from "@/components/MealsCarousel";
import HomepageClient from "@/components/HomepageClient";


export default async function HomePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return <HomepageClient email={session.user.email} session={session} />;
}



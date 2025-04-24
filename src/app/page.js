import Link from "next/link";
import Image from "next/image";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";
import SignOutButton from "./SignOutButton";
import GenerateLogic from "./GenerateMealLogic";
import MealButton from "./MealButton";

async function UserAvatar() {
    const session = await auth();

    if (!session?.user) return null;

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <h2 className="text-2xl font-bold text-center">User Info</h2>
            <p className="text-center">{session.user.name}</p>
            <p className="text-center">{session.user.email}</p>
            <Image
                src={session.user.image}
                alt="User Avatar"
                width={50}
                height={50}
                unoptimized
                className="rounded-full"
            />
        </div>
    );
}

export default async function HomePage() {
    const session = await auth();

    if (!session?.user) {
        redirect("/login");
    }

    return (
        <main>
            <UserAvatar />
            <h1 className="text-3xl font-bold text-center">Home Page</h1>
            <p className="text-center">Welcome to the Food Planner App.</p>

            {/* Show conditional content: Generate button or meals */}
            <GenerateLogic />
            <br />
            <Link href="/account">Account Page</Link>
            <br />
            <Link href="/create-account">Create Account Page</Link>
            <br />
            <Link href="/meal/KBBQ">
                Meal Info Page called &apos;KBBQ&apos;
            </Link>

            <br />
            <SignOutButton />
            <br />
            <MealButton />
        </main>
    );
}

//export default HomePage;

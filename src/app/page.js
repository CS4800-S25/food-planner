import Link from "next/link";
import Image from "next/image";
import { signIn, auth, signOut } from "@/app/auth";

export async function UserAvatar() {
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

function HomePage() {
    return (
        <main>
            <UserAvatar />
            <h1 className="text-3xl font-bold text-center">Home Page</h1>
            <p className="text-center">Welcome to the Food Planner App.</p>
            <Link href="/login">LoginPage</Link>
            <br />
            <Link href="/account">Account Page</Link>
            <br />
            <Link href="/create-account">Create Account Page</Link>
            <br />
            <Link href="/meal/KBBQ">
                Meal Info Page called &apos;KBBQ&apos;
            </Link>
            <form
                action={async () => {
                    "use server";
                    await signIn("google");
                }}
            >
                <button type="submit">Sign in with Google</button>
            </form>

            <form
                action={async () => {
                    "use server";
                    await signOut();
                }}
            >
                <button type="submit">Sign out</button>
            </form>
            <br />
        </main>
    );
}

export default HomePage;

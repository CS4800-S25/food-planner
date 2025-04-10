import Link from "next/link";

function HomePage() {
    return (
        <main>
            <h1 className="text-3xl font-bold text-center">Home Page</h1>
            <p className="text-center">This is the home page.</p>
            <Link href="/account">Account Page</Link>
            <br />
            <Link href="/create-account">Create Account Page</Link>
            <br />
            <Link href="/meal/KBBQ">
                Meal Info Page called &apos;KBBQ&apos;
            </Link>
        </main>
    );
}

export default HomePage;

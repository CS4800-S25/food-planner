import Link from "next/link";

async function MealInfo({ params }) {
    const { mealName } = await params;
    return (
        <>
            <h1>Details on a single meal called {mealName}</h1>
            <Link href="/">Return to Home Page</Link>
        </>
    );
}

export default MealInfo;

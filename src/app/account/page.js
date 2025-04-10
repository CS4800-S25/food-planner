import Link from "next/link";

function Account() {
    return (
        <>
            <h1>Account and Preferences</h1>
            <p>- Editing the meal plan preferences</p>
            <p>- Reuse flow from the create-account page</p>
            <Link href="/">Return to Home Page</Link>
        </>
    );
}

export default Account;

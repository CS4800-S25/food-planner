"use client";

import { useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { AccountContext } from "./AccountContext";
import db from "@/lib/firebase";
import { fetchUserInfo } from "@/lib/fetchUserInfo";

function FinalizeAccount() {
    const { data: session } = useSession(); // user session info from google sign-in
    const { formData } = useContext(AccountContext); // qll preferences entered in the steps
    // const [loading, setLoading] = useState(true);   // controls loading animation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [statusMessage, setStatusMessage] = useState(
        "Generating your personalized meals using AI..."
    );
    const router = useRouter(); // for redirecting the user

    useEffect(() => {
        const savePreferencesAndRedirect = async () => {
            if (!session) {
                console.error("No session found. Cannot save preferences.");
                return;
            }

            try {
                // compose full document to be saved in firestore
                let checkUserExists = await fetchUserInfo(session.user.email);
                if (checkUserExists) {
                    console.log(
                        "User already exists in Firestore. Skipping save."
                    );
                    setStatusMessage("Account already exists! Redirecting...");
                } else {
                    const docData = {
                        email: session.user.email,
                        name: session.user.name,
                        image: session.user.image,
                        preferences: formData,
                        timestamp: new Date(),
                    };

                    await addDoc(collection(db, "userMealPlans"), docData);
                    console.log("Saved to Firebase!");
                    setStatusMessage("All done! Redirecting...");
                }

                // small delay before redirect
                setTimeout(() => {
                    router.push("/"); // Redirect to homepage
                }, 3500);
            } catch (error) {
                console.error("Error saving preferences:", error);
                setStatusMessage("Failed to save. Please try again.");
            }
        };

        savePreferencesAndRedirect();
    }, [session, formData, router]);

    return (
        <div className="text-center text-green-700 font-semibold text-lg animate-pulse">
            <p> Generating your personalized meals using AI...</p>
            <p> All done! Redirecting...</p>
        </div>
    );
}

export default FinalizeAccount;

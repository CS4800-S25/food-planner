"use client";

import { useEffect, useContext, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { AccountContext } from "./AccountContext";
import db from "@/lib/firebase";
import { fetchUserInfo } from "@/lib/fetchUserInfo";
import { useQueryClient } from "@tanstack/react-query";


function FinalizeAccount() {
    const { data: session } = useSession(); // user session info from google sign-in
    const { formData } = useContext(AccountContext); // qll preferences entered in the steps
    // const [loading, setLoading] = useState(true);   // controls loading animation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [statusMessage, setStatusMessage] = useState(
        "Generating your personalized meals using AI..."
    );
    const queryClient = useQueryClient();
    const router = useRouter(); // for redirecting the user

    useEffect(() => {
        const savePreferencesAndRedirect = async () => {
            if (!session) {
                console.error("No session found. Cannot save preferences.");
                return;
            }

            try {
                const userEmail = session.user.email;
                console.log("User email:", userEmail);
                console.log("Form data:", formData);
            
                const docData = {
                    email: session.user.email,
                    name: session.user.name,
                    image: session.user.image,
                    preferences: formData,
                    timestamp: new Date(),
                };
            
                const userData = await fetchUserInfo(userEmail);
            
                if (userData && userData.id) {
                    // User exists, update their doc
                    const userDocRef = doc(db, "userMealPlans", userData.id);
                    await updateDoc(userDocRef, docData);
                    console.log("Updated preferences in Firestore.");
                    setStatusMessage("Preferences updated! Redirecting...");
                } else {
                    // New user, create new doc
                    await addDoc(collection(db, "userMealPlans"), docData);
                    console.log("Created new user document.");
                    setStatusMessage("Preferences saved! Redirecting...");
                }
            
                await queryClient.prefetchQuery({
                    queryKey: ["meals", userEmail],
                    queryFn: () => fetchMeals(userEmail),
                });
            
                router.push("/");
            
            } catch (error) {
                console.error("Error saving preferences:", error);
                setStatusMessage("Failed to save. Please try again.");
            }
        };

        savePreferencesAndRedirect();
    }, [session, formData, router, queryClient]);

    return (
        <div className="text-center text-green-700 font-semibold text-lg animate-pulse">
            <p> Generating your personalized meals using AI...</p>
            <p> All done! Redirecting...</p>
        </div>
    );
}

export default FinalizeAccount;

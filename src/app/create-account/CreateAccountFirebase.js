import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import db from "@/lib/firebase";
import { useSession } from "next-auth/react";  
import IngredientPreferences from "./(steps)/IngredientPreferences";

async function createAccountFirebase() {
    const documentData = {
        email: session?.user?.email,  // save the signed-in user's email

        // fill with real data later
        preferences: {
            ingredientPreferences: ["avocado", "broccoli"],
            healthGoals: "muscle gain",
            numberOfMeals: 3,
            budget: 35
        },

        name: "Bob",
        numberOfMeals: Math.floor(Math.random() * 10) + 1,
    };
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "userMealPlans"), documentData);
    console.log("Document written with ID: ", docRef.id);
}

function CreateAccountFirebase() {

    const {data: session} = useSession();

    return <Button onClick={createAccountFirebase(session)}>
                Create Account
           </Button>;
}

export default CreateAccountFirebase;

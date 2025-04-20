
import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import db from "@/lib/firebase";
import { useSession } from "next-auth/react";  
//import IngredientPreferences from "./(steps)/IngredientPreferences";
import { useContext, useState } from "react";
import { AccountContext } from "./AccountContext";
import { useRouter } from "next/navigation";

async function createAccountFirebase(session, formData) {
    //const { data: session } = useSession();
    
    const documentData = {
        
        email: session?.user?.email,  // save the signed-in user's email
        name: session?.user?.name,
        image: session?.user?.image,
        
        preferences: formData
        };

        //name: "Bob",
        //numberOfMeals: Math.floor(Math.random() * 10) + 1,
    
    // Add a new document to userMealPlans collection in Firestore
    const docRef = await addDoc(collection(db, "userMealPlans"), documentData);
    console.log("Document written with ID: ", docRef.id);
}

function CreateAccountFirebase() {

    const { data: session } = useSession();
    const { formData } = useContext(AccountContext); //pull data from context
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = async () => {
        if (!session) {
          console.error("No user session found");
          return;
        }

        setIsLoading(true);

        try {
            await createAccountFirebase(session, formData);
            console.log("Preferences saved to Firebase!");
            setTimeout(() => {
                router.push("/");
            }, 1000)
          } catch (err) {
            console.error("Error saving to Firebase:", err);
            setIsLoading(false);
          }
       };

    return (
        <div className="text-center mt-6 space-y-4">
            {isLoading ? (
                 <p className="text-green-600 text-lg font-medium">

                 </p>
            ) : (
                <Button onClick={handleClick}>
                 Finish
                </Button>
            )}
        </div>
    );
}

export default CreateAccountFirebase;

import { collection, addDoc } from "firebase/firestore";
import { Button } from "@/components/ui/button";
import db from "@/lib/firebase";

async function createAccountFirebase() {
    const documentData = {
        name: "Bob",
        numberOfMeals: Math.floor(Math.random() * 10) + 1,
    };
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "userMealPlans"), documentData);
    console.log("Document written with ID: ", docRef.id);
}

function CreateAccountFirebase() {
    return <Button onClick={createAccountFirebase}>Create Account</Button>;
}

export default CreateAccountFirebase;

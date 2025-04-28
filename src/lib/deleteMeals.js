// Dev utility function: delete all meals for a specific user from Firestore
// NOTE: This function is testing purposes only.
import db  from "@/lib/firebase";
import { collection, query, where, getDocs, deleteDoc, doc } from "firebase/firestore";

export async function deleteMeals(email) {
    const mealsRef = collection(db, "userMealPlans"); // Get a reference to the "userMealPlans" collection
    const q = query(mealsRef, where("email", "==", email)); // Build a query to find all meals where "email" field matches the given email
    const querySnapshot = await getDocs(q); // Execute the query and get the results
    if (querySnapshot.empty) {
        console.log("No meals found for this user.");
        return;
    }
    console.log("Deleting meals for user:", email); // Map over the results and prepare delete promises for each meal document

    const deletePromises = querySnapshot.docs.map((docSnap) => {
        return deleteDoc(doc(db, "userMealPlans", docSnap.id));
    });

    // Wait for all deletions to complete
    await Promise.all(deletePromises);
}

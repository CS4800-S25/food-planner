import db from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

// connects to firestore
// query meals where email == user.email
export async function fetchMeals(email) {
    const mealsRef = collection(db, "userMealPlans");
    const q = query(mealsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q); // get all documents that match the query

    const meals = [];
    querySnapshot.forEach((doc) => {
        meals.push({ id: doc.id, ...doc.data() }); // builds meals array from the results
    });

    return meals;
}
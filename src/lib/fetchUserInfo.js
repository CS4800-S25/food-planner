import db from "@/lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
export async function fetchUserInfo(email) {
    const user = await getDocs(
        query(collection(db, "userMealPlans"), where("email", "==", email))
    );
    if (user.empty) {
        return null;
    }
    console.log(user.docs[0].data());
    return user.docs[0].data();
}

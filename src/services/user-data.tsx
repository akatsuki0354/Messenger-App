import { doc, getDoc, getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth";
const db = getFirestore();
const auth = getAuth()
const users = auth.currentUser

export const fetchUsers = async () => {
    try {
        const user = auth.currentUser;
        if (!user) throw new Error("No authenticated user");

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const userData = { id: docSnap.id, ...docSnap.data() };
            console.log("User data:", userData);
            return [userData];
        } else {
            console.log("No such user!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
};
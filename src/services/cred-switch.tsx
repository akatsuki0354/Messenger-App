import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { collection, doc, setDoc, getFirestore } from "firebase/firestore";
import './firebaseSDK';

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const db = getFirestore();
    const users = collection(db, "users");

    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = result.user;
        const userId = user.uid;
        const removeEmail = user.email?.replace("@gmail.com", "")
        const linkUserId = `${removeEmail}=${userId}`
        await setDoc(doc(users, userId), {
            userName: user.displayName,
            isOnline: true,
            photoURL: user.photoURL,
            email: user.email,
            link: linkUserId
        });

        console.log("User logged in");

    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

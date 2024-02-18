import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, UserCredential, AuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDmIIcEkm7uMfY9mcJiGm-rd9eOHbqRQ2s",
    authDomain: "poke-api-c04a6.firebaseapp.com",
    projectId: "poke-api-c04a6",
    storageBucket: "poke-api-c04a6.appspot.com",
    messagingSenderId: "605071005920",
    appId: "1:605071005920:web:af8b13bd81515d24c25885",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

interface UserData {
    displayName: string | null;
    email: string | null;
    uid: string;
}


async function createUserCollection(uid: string, userData: UserData) {
    try {
        await setDoc(doc(db, "users", uid), userData);
    } catch (error) {
    }
}

async function LoginWithGoogle() {
    const provider: AuthProvider = new GoogleAuthProvider();
    try {
        const result: UserCredential = await signInWithPopup(auth, provider);
        const user = result.user;
        const userData: UserData = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
        };
        await createUserCollection(user.uid, userData);
        return userData;
    } catch (error) {
        console.log(error);
    }
};

async function LoginWithEmail(email: string, password: string) {
    try {
        const result: UserCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = result.user;
        const userData: UserData = {
            displayName: user.displayName,
            email: user.email,
            uid: user.uid,
        };
        await createUserCollection(user.uid, userData);
        return userData;
    } catch (error) {
        console.log(error);
    }
}

async function RegisterWithEmail(name: string, email: string, password: string) {
    try {
        const result: UserCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = result.user;
        if (user) {
            await updateProfile(user, { displayName: name });
            const userData: UserData = {
                displayName: name,
                email: user.email,
                uid: user.uid,
            };
            await createUserCollection(user.uid, userData);
            return userData;
        }
    } catch (error) {
        console.log(error);
    }
};

export { LoginWithGoogle, LoginWithEmail, RegisterWithEmail };

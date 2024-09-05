'use client'

import { auth } from "@/utils/firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

export default function SignIn() {
   const signInWithGoogle = async () => {
      const provider = new GoogleAuthProvider();
      try {
        const response = await signInWithPopup(auth, provider);
        console.log(response)
      } catch (error) {
        console.error("Error signing in with Google", error);
      }
    }
   return <div>
      <button onClick={signInWithGoogle}>Login with Google</button>
   </div>
}

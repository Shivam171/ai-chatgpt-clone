import './signInPage.css'
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
    return (
        <div className="signInPage">
            <SignIn path="/sign-in" signUpUrl='/sign-up'/>
        </div>
    )
}

import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SignIn path="/sign-in" signUpUrl='/sign-up'/>
        </div>
    )
}

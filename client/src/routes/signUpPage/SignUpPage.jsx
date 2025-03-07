import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <SignUp path="/sign-up" signInUrl='/sign-in' />
        </div>
    )
}

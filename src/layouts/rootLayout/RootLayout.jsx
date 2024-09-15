import { Link, Outlet } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { SignedIn, UserButton } from "@clerk/clerk-react";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key")
}

export default function RootLayout() {
    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <div className="bg-gradient-to-r min-h-screen grainy from-[#e7e6ff] via-[#eee0e9] to-[#F6E3EE]">
                {/* Main Content */}
                <div className="py-[15px] px-[30px] h-screen flex flex-col">
                    {/* Header */}
                    <header className='flex justify-between items-center mb-8'>
                        {/* Logo */}
                        <Link to={'/'} className='flex items-center font-bold gap-2'>
                            <img src="/logo.png" alt="Sensei AI" className='w-[40px] h-[40px] shadow-sm' />
                            <span className='text-2xl text-[#464646] font-medium'>SayGPT</span>
                        </Link>
                        {/* User */}
                        <div className=''>
                            <SignedIn>
                                <UserButton
                                    appearance={{
                                        elements: {
                                            userButtonAvatarBox: {
                                                width: '40px',
                                                height: '40px',
                                            },
                                        },
                                    }}
                                />
                            </SignedIn>
                        </div>
                    </header>
                    {/* Main */}
                    <main>
                        <Outlet />
                    </main>
                </div>
            </div>
        </ClerkProvider>
    )
}

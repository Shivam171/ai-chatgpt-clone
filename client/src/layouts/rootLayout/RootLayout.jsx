import { Link, Outlet } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import { SignedIn, UserButton } from "@clerk/clerk-react";
import { useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
}

export default function RootLayout() {
    const { scrollY } = useScroll();
    const [scrolled, setScrolled] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 0 && !scrolled) {
            setScrolled(true);
        } else if (latest === 0 && scrolled) {
            setScrolled(false);
        }
    });

    const defaultClasses = "transition-all absolute inset-0 -z-1";
    let navBarClasses = scrolled ? `${defaultClasses} border-b border-black/10 bg-white/10 backdrop-blur-lg` : `${defaultClasses} bg-transparent`;

    return (
        <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
            <div className="bg-gradient-to-r min-h-screen grainy from-[#e7e6ff] via-[#eee0e9] to-[#F6E3EE] flex flex-col">
                {/* Sticky Header */}
                <header className={`sticky top-0 z-20 py-4 px-8 flex justify-between items-center ${navBarClasses}`}>
                    {/* Logo and Layout Toggle */}
                    <div className="">
                        <Link to={'/'} className='flex items-center font-bold gap-2'>
                            <img src="/logo.png" alt="Sensei AI" className='w-[30px] h-[30px] shadow-sm' />
                            <span className='text-2xl text-[#464646] font-medium'>SayGPT</span>
                        </Link>
                    </div>
                    {/* User */}
                    <div>
                        <SignedIn>
                            <UserButton
                                appearance={{
                                    elements: {
                                        userButtonAvatarBox: {
                                            width: '32px',
                                            height: '32px',
                                        },
                                    },
                                }}
                            />
                        </SignedIn>
                    </div>
                </header>
                {/* Main Content */}
                <main className="absolute inset-0 z-5 py-[15px] px-[30px]">
                    <Outlet />
                </main>
            </div>
        </ClerkProvider>
    );
}
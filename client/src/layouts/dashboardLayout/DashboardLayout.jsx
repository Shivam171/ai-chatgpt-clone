import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import ChatList from '../../components/chatList/ChatList';
import {
    Sheet,
    SheetContent
} from "@/components/ui/sheet"
import { LoaderPinwheel } from 'lucide-react';

export default function DashboardLayout() {
    const [isChatListVisible, setIsChatListVisible] = useState(false);
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in');
        }
    }, [isLoaded, userId, navigate]);

    if (!isLoaded) {
        return (
            <div className="absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <LoaderPinwheel className='w-10 h-10 animate-spin' />
            </div>
        )
    }

    return (
        <div className="flex h-full">
            {/* Sheet for Chat List */}
            <Sheet open={isChatListVisible} onOpenChange={setIsChatListVisible}>
                <SheetContent side="left" className="w-72 grainy bg-[#E8E5FB]">
                    <ChatList />
                </SheetContent>
            </Sheet>
            <div className="grow h-full">
                <Outlet context={{ isChatListVisible, setIsChatListVisible }} />
            </div>
        </div>
    )
}

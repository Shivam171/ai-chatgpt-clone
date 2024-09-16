import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';
import ChatList from '../../components/chatList/ChatList';
import { AnimatePresence, motion } from 'framer-motion';

export default function DashboardLayout() {
    const [isChatListVisible, setIsChatListVisible] = useState(true);
    const { userId, isLoaded } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoaded && !userId) {
            navigate('/sign-in');
        }
    }, [isLoaded, userId, navigate]);

    if (!isLoaded) {
        return "Loading..."
    }

    return (
        <div className="flex gap-8 items-center h-full">
            <AnimatePresence>
                {isChatListVisible && (
                    <motion.div
                        key="chatList"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        className="h-full">
                        <ChatList />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="grow h-full">
                <Outlet context={{ isChatListVisible, setIsChatListVisible }} />
            </div>
        </div>
    )
}

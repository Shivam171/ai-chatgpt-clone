import { Link } from "react-router-dom"

export default function ChatList() {
    return (
        <div className="flex h-[calc(100vh-100px)] translate-y-14 bg-white/40 hover:bg-white/80 transition-all ease-linear backdrop-blur-md rounded-xl overflow-y-hidden">
            <div className="flex flex-col justify-between gap-4 h-full py-3 px-4">
                <div className="flex flex-col gap-4 h-full overflow-y-auto">
                    {/* Dashboard */}
                    <div className="flex flex-col">
                        <span className="mb-2 font-bold text-sm">DASHBOARD</span>
                        <div className="flex flex-col gap-2 text-sm">
                            <Link to='/dashboard'>
                                <div className="hover:bg-gray-200 transition-all ease-linear p-2 rounded-lg">
                                    New Chat
                                </div>
                            </Link>
                        </div>
                    </div>
                    {/* Chats */}
                    <div className="flex flex-col overflow-y-auto">
                        <span className="mb-2 font-bold text-sm">RECENT CHATS</span>
                        <div className="flex flex-col gap-2 text-sm">
                            <Link to='/dashboard/chats/123'>
                                <div className="hover:bg-gray-200 transition-all ease-linear p-2 rounded-lg">
                                    Chat Title
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
                {/* Upgrade */}
                <div className="flex items-center gap-2">
                    <img src="/logo.png" alt="SayGPT" className="w-10 h-10" />
                    <div className="flex flex-col">
                        <span className="font-bold text-sm">SayGPT Beta</span>
                        <span className="text-[12px] text-nowrap">Limited access to all features</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

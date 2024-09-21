import {
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetClose
} from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { ListPlus } from "lucide-react"
import { useQuery } from "@tanstack/react-query"

const CloseableLink = ({ to, children, className, ...props }) => {
    return (
        <SheetClose asChild>
            <Link to={to} className={className} {...props}>
                {children}
            </Link>
        </SheetClose>
    );
}


export default function ChatList() {

    const { isPending, error, data } = useQuery({
        queryKey: ['chats'],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/userchats`, { credentials: 'include' }).then(res => res.json())
        }
    })

    return (
        <div className="flex flex-col items-start h-full">
            <SheetHeader className="mb-2 w-full">
                <SheetTitle>Navigation</SheetTitle>
                <Link to='/dashboard' className="p-2 rounded-sm font-semibold flex gap-2 border border-[#464646]">
                    <ListPlus />
                    <span>New Chat</span>
                </Link>
            </SheetHeader>
            <SheetDescription>
                Recent chats are listed below
            </SheetDescription>
            <div className="mt-2 grow flex flex-col gap-2 overflow-y-auto w-full">
                {isPending ? <div className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Loading...</div> : error ? <div className="p-2 rounded-sm text-red-500 bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Error: {error.message}</div> : data?.map(chat => (
                    <CloseableLink key={chat._id} to={`/dashboard/chats/${chat._id}`} className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">{chat.title}</CloseableLink>
                ))}
            </div>
            <SheetFooter className="mt-2">
                <img src="/logo.png" alt="SayGPT" className="w-10 h-10" />
                <div className="flex flex-col">
                    <span className="font-bold text-sm">SayGPT Beta</span>
                    <span className="text-[12px] text-nowrap">Limited access to all features</span>
                </div>
            </SheetFooter>
        </div>

    )
}

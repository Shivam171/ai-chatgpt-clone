import {
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetClose
} from "@/components/ui/sheet"
import { Link } from "react-router-dom"
import { ListPlus } from "lucide-react"

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
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp 1</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp 2</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp 3</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp4</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp5</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp6</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp7</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp8</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp9</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp10</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp11</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp12</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp13</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp14</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp15</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp16</CloseableLink>
                <CloseableLink to='/dashboard/chats/123' className="p-2 rounded-sm bg-[#fff]/50 hover:bg-[#fff]/90 transition-all ease-linear w-[220px]">Temp17</CloseableLink>
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

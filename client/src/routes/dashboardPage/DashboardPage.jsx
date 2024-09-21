import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { useNavigate, useOutletContext } from "react-router-dom";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import {
    useMutation,
    QueryClient,
} from '@tanstack/react-query'

export default function DashboardPage() {
    const queryClient = new QueryClient()
    const navigate = useNavigate();
    const { isChatListVisible, setIsChatListVisible } = useOutletContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toggleButtonVisibility, setToggleButtonVisibility] = useState(true);

    const toggleChatList = () => {
        setIsChatListVisible(!isChatListVisible);
    };

    const toggleExtraButtonVisibility = () => {
        setToggleButtonVisibility(!toggleButtonVisibility);
    }

    const mutation = useMutation({
        mutationFn: (text) => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ text })
            }).then((res) => res.json())
        },
        onSuccess: (id) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['userChats'] });
            navigate(`/dashboard/chats/${id}`);
        },
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        if (!text) return;
        mutation.mutate(text);
    };

    return (
        <div className="flex flex-col pb-4 gap-4 items-center h-full">
            {/* Initial Area which is show when there is no conversation */}
            <div className="grow mt-16 flex flex-col items-center justify-center gap-4 select-none">
                <img src="/logo.png" alt="SayGPT" className="w-14 h-14" />
                <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-bold">Hi, User</span>
                    <span className="text-xl sm:text-3xl font-bold text-center">Can I help you with anything?</span>
                    <p className="text-[10px] text-nowrap sm:text-[14px]">Ready to assist you with anything you need, from answering <br /> questions to providing recommendations. Let&apos;s get started!</p>
                </div>
            </div>
            {/* Search and Buttons */}
            <div className="flex items-center gap-1 w-full sm:w-[550px] relative">
                <form onSubmit={handleSubmit} className="w-full items-center flex gap-1">
                    {toggleButtonVisibility && (
                        <>
                            {/* Chat List Toggle */}
                            <Button
                                type="button"
                                onClick={toggleChatList}
                                className="bg-[#454545] hover:bg-[#323232] border-none outline-none focus:ring-0 text-white shadow-md p-3 rounded-full transition-all ease-linear">
                                <BsLayoutSidebarInset className="w-4 h-4" />
                            </Button>
                            {/* Microphone Button */}
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button
                                        type="button"
                                        onClick={() => setIsDialogOpen(true)}
                                        className="bg-[#454545] hover:bg-[#323232] border-none outline-none focus:ring-0 text-white shadow-md p-3 rounded-full transition-all ease-linear"
                                    >
                                        <BsFillMicFill className="w-4 h-4" />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="w-[400px] sm:max-w-[500px] h-[420px] rounded-xl grainy bg-[#FAF7F9]">
                                    <div className="flex flex-col items-center h-full justify-center gap-4">
                                        <div className="border-2 border-red-300 rounded-full p-3 text-red-400">
                                            <BsFillMicFill className="w-10 h-10 animate-pulse duration-10" />
                                        </div>
                                        <p className="text-[16px]">Start by saying &quot;Hey SayGPT&quot;</p>
                                        <p className="text-[14px] line-clamp-6">Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </>
                    )}
                    {/* Text Area, Attach file and Search Button */}
                    <div className="flex items-center w-full">
                        {/* Attach File */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button type="button" className="absolute translate-x-2 bg-[#ECEAEA] p-3 rounded-full transition-all ease-linear">
                                        <FiPaperclip className="w-4 h-4" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Attach file</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                        {/* Text Area */}
                        <textarea
                            type="textarea"
                            name="text"
                            rows={1}
                            onFocus={toggleExtraButtonVisibility}
                            onBlur={() => setToggleButtonVisibility(true)}
                            placeholder="Search anything..."
                            className="shadow-sm focus:shadow-lg resize-none overflow-hidden transition-all ease-linear pl-14 pr-6 md:pr-[100px] py-[0.8rem] rounded-full w-full bg-[#FAF7F9] outline-none border-none"
                        />
                        {/* Search Button */}
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    {/* Search */}
                                    <Button type="submit" className="ml-1 bg-[#eb9781] hover:bg-[#e8785d] text-white p-3 rounded-full transition-all ease-linear">
                                        <AiOutlineSearch className="w-6 h-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Search</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </form>
            </div>
        </div>
    )
}

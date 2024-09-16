import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { FiPaperclip } from "react-icons/fi";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaPencilRuler } from "react-icons/fa";
import { useOutletContext } from "react-router-dom";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";

export default function DashboardPage() {
    const { isChatListVisible, setIsChatListVisible } = useOutletContext();
    const [isOpen, setIsOpen] = useState(false);
    const toggleChatList = () => {
        setIsChatListVisible(!isChatListVisible);
    };
    return (
        <div className="flex flex-col pb-4 gap-4 items-center h-full">
            {/* Response Area */}
            {/* <div className="grow bg-[#FAF7F9] rounded-xl mx-4 p-3 w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] mt-16 flex flex-col gap-4">
                Hello World
            </div> */}
            {/* Initial Area */}
            <div className="grow mt-16 flex flex-col items-center justify-center gap-4 select-none">
                <img src="/logo.png" alt="SayGPT" className="w-14 h-14" />
                <div className="flex flex-col items-center gap-2">
                    <span className="text-3xl font-bold">Hi, User</span>
                    <span className="text-xl sm:text-3xl font-bold text-center">Can I help you with anything?</span>
                    <p className="text-[10px] text-nowrap sm:text-[14px]">Ready to assist you with anything you need, from answering <br /> questions to providing recommendations. Let&apos;s get started!</p>
                </div>
            </div>
            {/* Search and Buttons */}
            <div className="flex items-center gap-1 bg-[#FAF7F9 w-full sm:w-[550px] relative">
                {/* Buttons */}
                <div className="flex gap-1">
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {/* 3 Dots */}
                            <Button
                                className="bg-[#454545] hover:bg-[#323232] border-none outline-none focus:ring-0 text-white shadow-md p-2 rounded-full transition-all ease-linear">
                                <BiDotsVerticalRounded className="w-6 h-6" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='ml-8 mb-2'>
                            <DropdownMenuItem className="cursor-pointer" onSelect={(event) => {
                                event.preventDefault();
                            }}>
                                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                    <DialogTrigger asChild>
                                        <Button onClick={() => setIsOpen(true)}>
                                            <BsFillMicFill className="w-4 h-4" />
                                            <span className="ml-3">Voice Input</span>
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
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={toggleChatList} className="cursor-pointer">
                                <Button>
                                    <BsLayoutSidebarInset className="w-4 h-4" />
                                    <span className="ml-3">Toggle Layout</span>
                                </Button>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {/* Text Area */}
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
                    {/* Search */}
                    <Button type="button" className="absolute hidden md:block translate-x-[415px] bg-[#eb9781] hover:bg-[#e8785d] text-white px-5 py-2 rounded-full transition-all ease-linear">
                        Search
                    </Button>
                    {/* Text Area */}
                    <form className="w-full items-center flex">
                        <textarea
                            type="textarea"
                            rows={1}
                            placeholder="Search anything..."
                            className="shadow-sm focus:shadow-lg resize-none overflow-hidden transition-all ease-linear pl-14 pr-6 md:pr-[100px] py-[0.8rem] rounded-full w-full bg-[#FAF7F9] outline-none border-none"
                        />
                    </form>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                {/* Search */}
                                <Button type="submit" className="md:hidden ml-1 bg-[#eb9781] hover:bg-[#e8785d] text-white p-2 rounded-full transition-all ease-linear">
                                    <AiOutlineSearch className="w-6 h-6" />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Search</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
            </div>
        </div>
    )
}

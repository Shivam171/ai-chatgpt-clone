import { BsLayoutSidebarInset } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillMicFill } from "react-icons/bs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import Upload from "@/components/upload/Upload";
import model from "@/lib/gemini";

export default function NewPrompt({ question, setQuestion, answer, setAnswer, img, setImg }) {
    const { isChatListVisible, setIsChatListVisible } = useOutletContext();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [toggleButtonVisibility, setToggleButtonVisibility] = useState(true);

    const toggleChatList = () => {
        setIsChatListVisible(!isChatListVisible);
    };

    const toggleExtraButtonVisibility = () => {
        setToggleButtonVisibility(!toggleButtonVisibility);
    }

    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "Hello, I have 2 dogs in my house." }],
            },
            {
                role: "model",
                parts: [{ text: "Great!, What can I do for you" }],
            }
        ],
        generationConfig: {
            // maxOutputTokens: 100,
        }
    })

    const add = async (text) => {
        setQuestion(text);
        const result = await chat.sendMessageStream(Object.entries(img.aiData).length ? [img.aiData, text] : text);
        let accumulatedText = "";
        for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            accumulatedText += chunkText;
            setAnswer(accumulatedText);
        }
        setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const text = e.target.text.value;
        if (!text) return;
        add(text);
    }

    return (
        <div className="flex flex-col pt-3 gap-2 w-full sm:w-[75%] relative">

            {/* Search and Buttons */}
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
                                <Upload setImg={setImg} img={img} />
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
    )
}

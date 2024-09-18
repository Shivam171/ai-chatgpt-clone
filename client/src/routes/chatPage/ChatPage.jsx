import { useState, useRef, useEffect } from "react";
import { AiFillPicture } from "react-icons/ai";
import { BsFillPencilFill } from "react-icons/bs";
import { FaBrain } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";
import { useOutletContext } from "react-router-dom";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import { IKImage } from "imagekitio-react";
import { BsLayoutSidebarInset } from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { BsFillMicFill } from "react-icons/bs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/Button";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "@/components/ui/dropdown-menu";
import Upload from "@/components/upload/Upload";
import model from "@/lib/gemini";
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function ChatPage() {
    const { isChatListVisible, setIsChatListVisible } = useOutletContext();
    const [messages, setMessages] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState("");
    const [editingIndex, setEditingIndex] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const endRef = useRef(null);
    const chatBoxRef = useRef(null);

    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });

    useEffect(() => {
        if (endRef.current) {
            const scrollToBottom = () => {
                const scrollContainer = endRef.current.parentElement;
                const targetPosition = scrollContainer.scrollHeight - scrollContainer.clientHeight;
                const startPosition = scrollContainer.scrollTop;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let startTime = null;

                const animateScroll = (currentTime) => {
                    if (startTime === null) startTime = currentTime;
                    const timeElapsed = currentTime - startTime;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const easeInOutCubic = progress < 0.5
                        ? 4 * progress * progress * progress
                        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

                    scrollContainer.scrollTop = startPosition + distance * easeInOutCubic;

                    if (timeElapsed < duration) {
                        requestAnimationFrame(animateScroll);
                    }
                };

                requestAnimationFrame(animateScroll);
            };

            scrollToBottom();
        }
    }, [messages]);


    const toggleChatList = () => {
        setIsChatListVisible(!isChatListVisible);
    };

    const handleEdit = (index) => {
        setEditingIndex(index);
        setCurrentQuestion(messages[index].content);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!currentQuestion.trim() && !img.dbData?.filePath) return;

        if (editingIndex !== null) {
            // Update existing message
            const newMessages = [...messages];

            if (img.dbData?.filePath) {
                newMessages.push({
                    role: "user",
                    content: "Image",
                    imageUrl: img.dbData.filePath
                });
            }

            newMessages.push({ role: "user", content: currentQuestion });
            setMessages(newMessages);
        } else {
            // Add new message
            setMessages([...messages, { role: "user", content: currentQuestion }]);
        }

        // Get AI response
        try {
            let modelInput = [];
            if (img.aiData?.data) {
                modelInput.push({
                    inlineData: {
                        mimeType: img.aiData.mimeType,
                        data: img.aiData.data
                    }
                });
            }
            if (currentQuestion.trim()) {
                modelInput.push({ text: currentQuestion });
            }

            const result = await model.generateContent(modelInput);
            const apiResponse = await result.response;
            const aiResponseText = apiResponse.candidates[0].content.parts[0].text;
            setMessages(prev => [...prev, { role: "ai", content: aiResponseText }]);
        } catch (error) {
            console.error("Error getting AI response:", error);
            setMessages(prev => [...prev, { role: "ai", content: "Sorry, I couldn't process that request." }]);
        }

        setCurrentQuestion("");
        setImg({
            isLoading: false,
            error: "",
            dbData: {},
            aiData: {},
        });
    };

    const components = {
        code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
                <SyntaxHighlighter
                    style={solarizedlight}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            ) : (
                <code className={className} {...props}>
                    {children}
                </code>
            );
        },
    };

    const renderMessage = (message, index) => (
        <div key={index} className={`flex gap-2 w-full items-start ${message.role === "user" ? "justify-end" : ""}`}>
            {message.role === "ai" && (
                <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                    <FaBrain className="w-4 h-4" />
                </div>
            )}
            <div className="rounded-xl sm:w-3/4 lg:w-1/2">
                {message.role === "user" && message.imageUrl ? (
                    <div className="flex gap-2 w-full items-start justify-end">
                        <IKImage
                            urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                            path={message.imageUrl}
                            className="rounded-xl"
                            width="150"
                            transformation={[{ width: 150 }]}
                        />
                        <div className="flex items-center gap-2">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                                            <AiFillPicture className="w-4 h-4" />
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Edit</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>
                    </div>
                ) : message.role === "user" ? (
                    <Textarea
                        readOnly={editingIndex !== index}
                        value={editingIndex === index ? currentQuestion : message.content}
                        onChange={(e) => editingIndex === index && setCurrentQuestion(e.target.value)}
                        className="bg-white p-3 rounded-xl resize-none text-md"
                    />
                ) : (
                    <div className="bg-white p-3 rounded-xl">
                        <ReactMarkdown
                            rehypePlugins={[rehypeRaw]}
                            remarkPlugins={[remarkGfm]}
                            components={components}
                        >
                            {message.content}
                        </ReactMarkdown>
                    </div>
                )}
            </div>
            {message.role === "user" && !message.imageUrl && (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <div onClick={() => handleEdit(index)} className="flex bg-[#464646] text-white cursor-pointer rounded-full w-fit p-2">
                                <BsFillPencilFill className="w-4 h-4" />
                            </div>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            )}
        </div>
    );

    return (
        <div className="flex flex-col pb-4 gap-4 items-center h-full">
            {/* Chat Box */}
            <div ref={chatBoxRef} className="grow overflow-auto scrollbar-hide rounded-xl mx-4 p-3  sm:w-[500px] md:w-[600px] lg:w-[900px] xl:w-[1000px] mt-16 flex flex-col gap-4">
                {img.isLoading && <div>Loading...</div>}
                {messages.map(renderMessage)}
                <div ref={endRef} />
            </div>
            {/* Search and Buttons */}
            <div className="flex items-center gap-1 w-full sm:w-[550px] relative">
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button className="bg-[#454545] hover:bg-[#323232] border-none outline-none focus:ring-0 text-white shadow-md p-2 rounded-full transition-all ease-linear">
                            <BiDotsVerticalRounded className="w-6 h-6" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='ml-8 mb-2'>
                        <DropdownMenuItem className="cursor-pointer" onSelect={(event) => event.preventDefault()}>
                            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                                <DialogTrigger asChild>
                                    <Button onClick={() => setIsOpen(true)} className="w-full">
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
                            <Button className="w-full">
                                <BsLayoutSidebarInset className="w-4 h-4" />
                                <span className="ml-3">Toggle Layout</span>
                            </Button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center w-full">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Upload setImg={setImg} setMessages={setMessages} />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Attach file</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <Button type="submit" form="chat-form" className="absolute hidden md:block translate-x-[415px] bg-[#eb9781] hover:bg-[#e8785d] text-white px-5 py-2 rounded-full transition-all ease-linear">
                        Search
                    </Button>
                    <form id="chat-form" className="w-full items-center flex" onSubmit={handleSubmit}>
                        <textarea
                            name="question"
                            value={currentQuestion}
                            onChange={(e) => setCurrentQuestion(e.target.value)}
                            rows={1}
                            placeholder="Search anything..."
                            className="shadow-sm focus:shadow-lg resize-none overflow-hidden transition-all ease-linear pl-14 pr-6 md:pr-[100px] py-[0.8rem] rounded-full w-full bg-[#FAF7F9] outline-none border-none"
                        />
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Button type="submit" className="md:hidden ml-1 bg-[#eb9781] hover:bg-[#e8785d] text-white p-2 rounded-full transition-all ease-linear">
                                        <AiOutlineSearch className="w-6 h-6" />
                                    </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Search</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </form>
                </div>
            </div>
        </div>
    );
}
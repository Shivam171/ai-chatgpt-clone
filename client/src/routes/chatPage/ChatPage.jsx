import { GiSpeaker } from "react-icons/gi";
import { AiOutlineClose } from 'react-icons/ai';
import { BsFillClipboardFill } from "react-icons/bs";
import { useRef, useEffect, useState } from "react";
import { FaBrain, FaUserAlt } from "react-icons/fa";
import { IKImage } from "imagekitio-react";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import NewPrompt from "@/components/newPrompt/NewPrompt";
// ----------- Syntax Highlighter for Markdown -----------
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import toast from "react-hot-toast";

export default function ChatPage() {
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [img, setImg] = useState({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
    });
    const [speakingIndex, setSpeakingIndex] = useState(null);
    const endRef = useRef(null);
    const path = useLocation().pathname;
    const chatId = path.split("/").pop();
    const { user } = useUser();

    const { isPending, error, data } = useQuery({
        queryKey: ['chat', chatId],
        queryFn: () => {
            return fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, { credentials: 'include' }).then(res => {
                // console.log(res);
                return res.json()
            })
        },
        refetchInterval: 1000,
    })

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
    }, [data, question, answer, img.dbData]);

    const syntaxHightLight = {
        code({ inline, className, children, ...props }) {
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

    // Function to copy AI response to clipboard
    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                toast.success("Copied to clipboard!");
            })
            .catch((err) => {
                console.error("Failed to copy: ", err);
                toast.error("Failed to copy!");
            });
    };

    // Function for Text-to-Speech
    const handleTextToSpeech = (text, idx) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);

            // Start speaking and set the active index
            setSpeakingIndex(idx);

            // When the speech ends, reset the state
            utterance.onend = () => {
                setSpeakingIndex(null);
            };

            // Handle canceling the speech if the close icon is clicked
            utterance.onerror = () => {
                setSpeakingIndex(null);
            };
        } else {
            toast.error("Text-to-Speech not supported in this browser.");
        }
    };

    // Function to cancel speech
    const handleCancelSpeech = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setSpeakingIndex(null);
        }
    };

    return (
        <div className="flex flex-col items-center h-full">
            {/* Chat Box */}
            <div className="grow overflow-auto scrollbar-hide rounded-xl sm:w-[500px] md:w-[600px] lg:w-[900px] xl:w-[1000px] mt-16 flex flex-col gap-4">
                {/* Chat History */}
                {isPending
                    ? <div>Loading...</div>
                    : error
                        ? <div>Something went wrong!</div>
                        : data?.history?.map((message, index) => (
                            <>
                                {/* User Message and Image If Exist */}
                                {message.role === "user" && (
                                    <div key={index} className="flex flex-col gap-2 w-full items-end">
                                        {/* header */}
                                        <div className="flex items-center gap-2">
                                            <span className="font-semibold">{user?.fullName || "User"}</span>
                                            {user?.imageUrl ? (
                                                <img
                                                    src={user.imageUrl}
                                                    alt="User Avatar"
                                                    className="w-8 h-8 rounded-full"
                                                />
                                            ) : (
                                                <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                                                    <FaUserAlt className="w-4 h-4" />
                                                </div>
                                            )}
                                        </div>
                                        {/* User Query Image */}
                                        {message.img && (
                                            <div key={index} className="flex w-fit items-start justify-start bg-white rounded-xl p-2">
                                                <IKImage
                                                    key={index}
                                                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                                    path={message.img}
                                                    className="rounded-xl"
                                                    width="150"
                                                    transformation={[{ width: 150 }]}
                                                    loading="lazy"
                                                    lqip={{ active: true, quality: 20 }}
                                                />
                                            </div>
                                        )}
                                        {/* User Question */}
                                        <div className="rounded-xl max-w-[80%] bg-white p-4 text-sm">
                                            {message.parts[0].text}
                                        </div>
                                    </div>
                                )}
                                {/* AI Response */}
                                {message.role === "model" && (
                                    <div key={index} className="flex flex-col gap-2 items-start">
                                        {/* header */}
                                        <div className="flex items-center gap-2">
                                            <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                                                <FaBrain className="w-4 h-4" />
                                            </div>
                                            <span className="font-semibold">Say GPT</span>
                                        </div>
                                        {/* content */}
                                        <div className="rounded-xl max-w-[80%] bg-white p-4 text-sm flex flex-col gap-2">
                                            <ReactMarkdown
                                                remarkPlugins={[remarkGfm]}
                                                rehypePlugins={[rehypeRaw]}
                                                components={syntaxHightLight}
                                            >
                                                {message.parts[0].text}
                                            </ReactMarkdown>
                                            {/* Copy to Clipboard and Text to Speech */}
                                            <div className="flex gap-2 justify-end">
                                                <div
                                                    onClick={() => handleCopyToClipboard(message.parts[0].text)}
                                                    className="cursor-pointer bg-[#464646] text-white rounded-full w-fit p-2">
                                                    <BsFillClipboardFill className="w-4 h-4" />
                                                </div>
                                                <div
                                                    className={`cursor-pointer ${speakingIndex === index ? 'bg-red-500' : 'bg-[#464646]'} text-white rounded-full w-fit p-1`}
                                                    onClick={() =>
                                                        speakingIndex === index
                                                            ? handleCancelSpeech()
                                                            : handleTextToSpeech(message.parts[0].text, index)
                                                    }
                                                >
                                                    {speakingIndex === index ? (
                                                        <AiOutlineClose className="w-6 h-6" />
                                                    ) : (
                                                        <GiSpeaker className="w-6 h-6" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </>
                        ))}

                {/* User Query */}
                {(img.isLoading || img.dbData?.filePath || question) && (
                    <div className="flex flex-col gap-2 w-full items-end">
                        {/* header */}
                        <div className="flex items-center gap-2">
                            <span className="font-semibold">{user?.fullName || "User"}</span>
                            {user?.imageUrl ? (
                                <img
                                    src={user.imageUrl}
                                    alt="User Avatar"
                                    className="w-8 h-8 rounded-full"
                                />
                            ) : (
                                <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                                    <FaUserAlt className="w-4 h-4" />
                                </div>
                            )}
                        </div>

                        {/* Image Upload */}
                        {img.isLoading && (
                            <div className="flex w-fit items-start justify-start bg-white rounded-xl p-2">
                                <span>Uploading...</span>
                            </div>
                        )}

                        {img.dbData?.filePath && (
                            <div className="flex w-fit items-start justify-start bg-white rounded-xl p-2">
                                <IKImage
                                    urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                                    path={img.dbData?.filePath}
                                    className="rounded-xl"
                                    width="150"
                                    transformation={[{ width: 150 }]}
                                />
                            </div>
                        )}

                        {/* User Question */}
                        {question && (
                            <div className="rounded-xl max-w-[80%] bg-white p-4 text-sm">
                                {question}
                            </div>
                        )}
                    </div>
                )}

                {/* AI Response */}
                {answer && (
                    <div className="flex flex-col gap-2 items-start">
                        {/* header */}
                        <div className="flex items-center gap-2">
                            <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                                <FaBrain className="w-4 h-4" />
                            </div>
                            <span className="font-semibold">Say GPT</span>
                        </div>
                        {/* content */}
                        <div className="rounded-xl max-w-[80%] bg-white p-4 text-sm">
                            <ReactMarkdown
                                rehypePlugins={[rehypeRaw]}
                                remarkPlugins={[remarkGfm]}
                                components={syntaxHightLight}
                            >
                                {answer}
                            </ReactMarkdown>
                        </div>
                    </div>
                )}
                <div ref={endRef} />
            </div>
            {/* Search and Buttons */}
            {data && (
                <NewPrompt
                    data={data}
                    question={question}
                    setQuestion={setQuestion}
                    answer={answer}
                    setAnswer={setAnswer}
                    img={img}
                    setImg={setImg}
                />
            )}
        </div>
    );
}
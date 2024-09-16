import { FaUserAlt } from "react-icons/fa";
import { FaBrain } from "react-icons/fa";
import { Textarea } from "@/components/ui/textarea";

export default function ChatPage() {
    return (
        <div className="flex flex-col pb-4 gap-4 items-center h-full">
            <div className="grow overflow-auto scrollbar-hide rounded-xl mx-4 p-3 w-full md:w-[600px] lg:w-[800px] xl:w-[1000px] mt-16 flex flex-col gap-4">
                {/* User Query */}
                <div className="flex flex-col gap-2 w-full items-end">
                    {/* header */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold">User</span>
                        <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                            <FaUserAlt className="w-4 h-4" />
                        </div>
                    </div>
                    {/* content */}
                    <Textarea type="text" readonly value="Query from user." className="rounded-xl w-1/2 resize-none" />
                </div>
                {/* AI Response */}
                <div className="flex flex-col gap-2 items-start">
                    {/* header */}
                    <div className="flex items-center gap-2">
                        <div className="flex bg-[#464646] text-white rounded-full w-fit p-2">
                            <FaBrain className="w-4 h-4" />
                        </div>
                        <span className="font-semibold">Say GPT</span>
                    </div>
                    {/* content */}
                    <Textarea type="text" readonly value="Response from AI." className="rounded-xl w-1/2 resize-none" />
                </div>
            </div>
        </div>
    )
}

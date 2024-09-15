import { BsBoxArrowInRight } from "react-icons/bs";
import { BsArrowRight } from "react-icons/bs";
import { BiRightArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom"


export default function Homepage() {
    return (
        <div className="homepage">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                {/* Introducing SayGPT */}
                <Link to='https://github.com/shivam171' target="_blank">
                    <div className="flex items-center justify-center">
                        <div className="bg-white/40 hover:bg-white/80 shadow-lg hover:shadow-xl transition-all ease-linear px-3 py-1 rounded-full flex items-center gap-1 w-fit">
                            ✨ Introducing SayGPT <BsArrowRight />
                        </div>
                    </div>
                </Link>
                {/* Slogan and Title */}
                <div className="text-xl text-center mt-4">
                    <p>Experience Next Gen of AI</p>
                    <span className="text-7xl font-bold">SayGPT</span>
                </div>
                {/* Get Started Button */}
                <div className="flex items-center justify-center mt-8">
                    <Link to="/sign-in">
                        <button className="bg-[#464646] text-white shadow-lg px-6 py-2 rounded-full hover:bg-[#393939]">Get Started</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

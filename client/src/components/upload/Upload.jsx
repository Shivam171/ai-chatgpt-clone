import { IKContext, IKImage, IKUpload } from "imagekitio-react";
import { useRef } from "react";
import { Button } from "@/components/ui/Button";
import { FiPaperclip } from "react-icons/fi";

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator = async () => {
    try {
        const response = await fetch('http://localhost:3001/api/upload');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
}

export default function Upload({ setImg }) {
    const fileInput = useRef(null);
    const onError = (err) => {
        console.log("Err:", err);
    }

    const onSuccess = (res) => {
        console.log("Success:", res);
        setImg(prev => ({
            ...prev,
            isLoading: false,
            dbData: res
        }));
    }

    const onUploadProgress = (progress) => {
        console.log("Progress:", progress);
    }

    const onUploadStart = (evt) => {
        const file = evt.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImg(prev => ({
                ...prev,
                isLoading: true,
                aiData: {
                    inlineData: {
                        mimeType: file.type,
                        data: reader.result.split(",")[1],
                    }
                }
            }));
        }
        reader.readAsDataURL(file);
    }

    return (
        <IKContext
            urlEndpoint={urlEndpoint}
            publicKey={publicKey}
            authenticator={authenticator}
        >
            <IKUpload
                fileName="test-upload.png"
                useUniqueFileName={true}
                onUploadProgress={onUploadProgress}
                onUploadStart={onUploadStart}
                onError={onError}
                onSuccess={onSuccess}
                style={{ display: "none" }}
                ref={fileInput}
            />
            {
                <Button type="button" onClick={() => fileInput.current.click()} className="absolute translate-x-2 bg-[#ECEAEA] p-3 rounded-full transition-all ease-linear">
                    <FiPaperclip className="w-4 h-4" />
                </Button>
            }
        </IKContext>
    )
}

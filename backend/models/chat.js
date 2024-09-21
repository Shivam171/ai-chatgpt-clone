import mongoose from "mongoose";

const chatsSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    history: [
        {
            role: { type: String, enum: ["user", "model"], required: true },
            parts: [
                {
                    text: { type: String, required: true },
                },
            ],
            img: {
                type: String, required: false
            },
        },
    ],
}, {
    timestamps: true
});

export default mongoose.model.chatsSchema || mongoose.model("chat", chatsSchema)
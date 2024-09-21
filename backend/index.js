import express from "express";
import ImageKit from "imagekit";
import cors from "cors";
import mongoose from "mongoose";
import UserChats from "./models/userChats.js";
import Chat from "./models/chat.js";
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node'

const port = process.env.PORT || 3001;
const app = express();

// Enable CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Connect to MongoDB
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        throw error;
    }
}

// Authentication
const imagekit = new ImageKit({
    urlEndpoint: process.env.IMAGE_KIT_ENDPOINT,
    publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
    privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
})

// Endpoint for Image Upload
app.get("/api/upload", (req, res) => {
    const result = imagekit.getAuthenticationParameters();
    res.send(result);
})

// Endpoint for Chats Storage
app.post("/api/chats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { text } = req.body;
    // console.log("userId: ", userId, "text: ", text);

    try {
        // Create a new chat
        const newChat = new Chat({
            userId: userId,
            history: [{ role: "user", parts: [{ text }] }],
        });

        // Save the new chat
        const savedChat = await newChat.save();

        // Check if the user chat exists
        const userChats = await UserChats.find({ userId: userId });

        // If not, create a new user chat
        if (!userChats.length) {
            const newUserChats = new UserChats({
                userId: userId,
                chats: [{
                    _id: savedChat._id,
                    title: text.substring(0, 40),
                }]
            })
            await newUserChats.save();
        } else {
            // If exists, Add the new chat to the user chat
            await UserChats.updateOne({ userId: userId },
                {
                    $push: {
                        chats: {
                            _id: savedChat._id,
                            title: text.substring(0, 40),
                        },
                    },
                },
            );
            res.status(201).send(newChat._id);
        }
    } catch (err) {
        console.log("Error: ", err);
        res.status(500).send("Oops! An error occurred while creating chats!");
    }
})

// Endpoint for fetching User chats for Chatlist
app.get("/api/userchats", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try {
        const userChats = await UserChats.find({ userId });
        res.status(200).send(userChats[0].chats);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Oops! An error occurred while fetching user chats.");
    }
})

// Endpoint for fetching chats for chatpage
app.get("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    try {
        const chat = await Chat.findOne({ _id: req.params.id, userId });
        res.status(200).send(chat);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("Oops! An error occurred while fetching chat.");
    }
})

// Endpoint for updating chat
app.put("/api/chats/:id", ClerkExpressRequireAuth(), async (req, res) => {
    const userId = req.auth.userId;
    const { question, answer, img } = req.body;
    const newItems = [
        ...(question ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }] : []),
        { role: "model", parts: [{ text: answer }] },
    ]
    try {
        const updatedChat = await Chat.updateOne({
            _id: req.params.id, userId
        }, {
            $push: {
                history: {
                    $each: newItems,
                }
            }
        })
        res.status(200).send(updatedChat);
    } catch (err) {
        console.error("Error: ", err);
        res.status(500).send("An error occurred while adding conversation.");
    }
})

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(401).send('Unauthenticated!')
});

// Start the server
app.listen(port, () => {
    connect();
    console.log(`Listening port ${port}`);
})
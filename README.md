![Say-GPT_Shivam171](https://github.com/user-attachments/assets/f2ac241c-8f04-4415-a541-1e9ca596b52f)

# 🧠 AI-ChatGPT-Clone

This project is a **simple GPT Chat** similar to OpenAI's ChatGPT and Google's Gemini. Users can ask questions, and the AI provides responses using the **Gemini API**. Additionally, users can upload images, and the AI will provide answers related to the image.

The design of this project is inspired by the beautiful design from [SayHalo - Next Level Chat AI](https://dribbble.com/shots/24631824-SayHalo-Next-Level-Chat-AI) created by Asal Design for Kretya Studio on Dribbble. 🎨

This is a **full-stack project** built with modern web technologies and styled using **Tailwind CSS**. It supports **user authentication** via Clerk and stores user chat history in MongoDB. The interface is responsive and supports markdown rendering, text-to-speech (TTS), and clipboard copy functionality for AI responses.

If you like this project, give it a ⭐.

## 🚀 Features

- **Chat with AI:** Ask questions and receive responses from the Gemini API.
- **Image Uploads:** Upload an image and get AI responses based on it.
- **User Chat History:** Stores user conversations in MongoDB.
- **Authentication:** Protect routes using Clerk authentication.
- **Clipboard & TTS:** Copy AI responses to the clipboard or listen to them via Text-to-Speech.
- **Markdown Support:** AI responses are rendered in markdown format with syntax highlighting.
- **Responsive UI:** Tailwind CSS for a fully responsive design.
- **Image Transformations:** ImageKit.io integration for image uploads and transformation.

## 🛠️ Technologies Used

- **Frontend:**

  - [Vite](https://vitejs.dev/)
  - [React 18](https://react.dev/learn/start-a-new-react-project)
  - [React Router DOM](https://reactrouter.com/en/main/start/tutorial)
  - [Tailwind CSS](https://tailwindcss.com/docs/installation)
  - [ImageKit.io](https://imagekit.io/docs) for image handling
  - [Clerk](https://clerk.com/) for authentication
  - [ShadCN](https://ui.shadcn.com/docs/installation) for fast UI components
  - [React Query](https://tanstack.com/query/latest/docs/framework/react/installation) for API state management
  - [React Markdown](https://www.npmjs.com/package/react-markdown) + [Syntax Highlighter](https://www.npmjs.com/package/react-syntax-highlighter) for rendering markdown responses
  - [React Icons](https://react-icons.github.io/react-icons/) + [Lucide React](https://lucide.dev/guide/installation) for icons
  - [React Hot Toast](https://react-hot-toast.com/docs) for notifications

- **Backend:**
  - [Node.js](https://nodejs.org/en)
  - [Express](https://expressjs.com/)
  - [MongoDB](https://www.mongodbtutorial.org/)
  - [Mongoose](https://mongoosejs.com/)
  - [Nodemon](https://www.npmjs.com/package/nodemon)
  - [CORS](https://www.npmjs.com/package/cors)

## 🖥️ How to Use

1. **Clone the repo:**

   ```bash
   git clone https://github.com/Shivam171/ai-chatgpt-clone
   ```

2. **Navigate to both the `client` and `backend` folders** to set up the project.

3. **Set up environment variables:**

   - Refer to the `.env.example` files in both `client` and `backend` folders for the required environment variables.
   - Create a `.env` file in each folder and populate it with the necessary values.

4. **Run the Backend:**

   - Open a terminal in the `backend` folder and run:

     ```bash
     npm install
     npm start
     ```

5. **Run the Frontend:**

   - Open another terminal in the `client` folder and run:

     ```bash
     npm install
     npm run dev
     ```

6. **Access the app:**
   - Visit `http://localhost:5173` for the frontend.
   - Backed will be running on `http://localhost:3001`, you can change it from your env.

## 🚧 Limitations

The AI might not always provide the most accurate or up-to-date information since it depends on the Gemini API. However, for educational purposes, it does the job well. 🛠️

## 📚 Learning Opportunities

This project is an excellent way to learn about:

- Full-stack development
- Authentication and protected routes
- AI chatbots and API integrations
- Image handling and transformation
- Markdown rendering and syntax highlighting
- Text-to-Speech and interactive UIs

## 🤝 Contributing

There are many features that can be added to this project to make it even better. If you'd like to contribute:

1. **Give it a ⭐ and Fork the repository.**
2. **Create a feature branch.**
3. **Send a pull request.**

I'll be happy to review and help you! 🙌

---

### 🎓 Final Thoughts

This project is **free** and ready to use. It's highly recommended to give it a try and learn from it. Building this project has been a great learning experience for me, and I hope it helps you as well. There’s always room for improvement, so feel free to dive in, explore, and even contribute if you'd like. Happy coding! 🚀

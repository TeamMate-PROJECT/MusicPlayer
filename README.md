# Emotion-Based Music Player 🎵🎧

An AI-powered music player that categorizes music based on emotions, providing a personalized experience. Built using **React.js (Frontend)** and **Node.js + Express.js + MongoDB (Backend)**.

## 🚀 Features
- 🎭 **Emotion-Based Music Selection** – Songs categorized into emotions (Happy, Sad, Relaxed, etc.)
- 🔒 **User Authentication** – Secure login & signup with JWT
- 🎶 **Music Player UI** – Play, pause, next, volume control, and waveform visualization
- 📂 **Playlist & Library** – Users can create, save, and manage playlists
- ☁ **Cloudinary Integration** – Songs and images stored in Cloudinary, URLs saved in MongoDB
- 🎛 **Custom Settings & Dark Mode** – User preferences and theme customization

## 🛠 Tech Stack
### Frontend (React.js)
- React.js (Vite)
- Tailwind CSS
- React Router
- Redux (for state management)
- Axios (for API requests)

### Backend (Node.js, Express.js, MongoDB)
- Node.js & Express.js
- MongoDB with Mongoose
- JWT Authentication
- Cloudinary API (for media storage)
- Multer (for file uploads)
- Bcrypt.js (for password hashing)

## 📂 Project Structure
```
Emotion-Based-Music-Player/
│── frontend/               # React.js Frontend
│   ├── public/             # Static assets
│   ├── src/
│   │   ├── assets/         # Images, icons, etc.
│   │   ├── components/     # Reusable UI components
│   │   │   ├── CarouselDefault.jsx
│   │   │   ├── Display.jsx
│   │   │   ├── DisplayHome.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── MoodSongs.jsx
│   │   │   ├── NavBar.jsx
│   │   │   ├── Player.jsx
│   │   │   ├── Playlist.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Songitem.jsx
│   │   │   ├── UploadSongs.jsx
│   │   ├── context/        # Global state management
│   │   ├── store/          # Redux store
│   │   ├── App.js          # Main app file
│── backend/                # Node.js Backend
│   ├── models/             # Mongoose Models
│   ├── routes/             # Express Routes
│   ├── controllers/        # Request Handlers
│   ├── middleware/         # Authentication & Middleware
│   ├── config/             # Database & Cloudinary Config
│   ├── server.js           # Main Server File
```

## 🛠 Installation & Setup
### Clone the Repository
```bash
git clone https://github.com/yourusername/emotion-music-player.git
cd emotion-music-player
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Backend Setup
```bash
cd backend
npm install
npm start
```

## 🌍 Environment Variables
Create a `.env` file in the `backend` folder and add:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```


---
Enjoy the emotion-driven music experience! 🎶


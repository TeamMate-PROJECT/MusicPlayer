import React, { useState } from "react";

const UploadSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [album, setAlbum] = useState("");
  const [genre, setGenre] = useState("");
  const [emotion, setEmotion] = useState("Happy");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [duration, setDuration] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => setImage(e.target.files[0]);
  const handleAudioChange = (e) => setAudio(e.target.files[0]);

  const resetForm = () => {
    setTitle("");
    setArtist("");
    setAlbum("");
    setGenre("");
    setEmotion("Happy");
    setDescription("");
    setReleaseDate("");
    setDuration("");
    setIsFeatured(false);
    setImage(null);
    setAudio(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image || !audio) {
      setMessage("⚠️ Please select both an image and an audio file.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("album", album);
    formData.append("genre", genre);
    formData.append("emotion", emotion);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("duration", duration);
    formData.append("isFeatured", isFeatured);
    formData.append("image", image);
    formData.append("audio", audio);

    setIsLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const contentType = response.headers.get("content-type");

      if (contentType && contentType.includes("application/json")) {
        const result = await response.json();

        if (response.ok) {
          setMessage("✅ Song uploaded successfully!");
          resetForm();
        } else {
          setMessage(result.message || "⚠️ Upload failed due to a server error.");
        }
      } else {
        const htmlText = await response.text();
        const match = htmlText.match(/<pre>(.*?)<\/pre>/i);
        let extracted = match ? match[1] : htmlText;

        try {
          const json = JSON.parse(extracted);
          setMessage(`❌ Upload failed: ${json.message || "Unknown error"}`);
        } catch {
          console.error("❌ Could not parse HTML error body:", extracted);
          setMessage("❌ Server error occurred. Please check backend logs.");
        }
      }
    } catch (error) {
      console.error("❌ Upload failed:", error);
      setMessage("❌ Connection failed. Please ensure your server is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-2xl mt-10">
      <h1 className="text-3xl font-extrabold text-white mb-6 text-center">
        🎵 Upload a New Song
      </h1>

      {message && (
        <p
          className={`text-center font-semibold mb-4 ${
            message.startsWith("✅") ? "text-green-400" : "text-red-400"
          }`}
        >
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {[
          { label: "Song Title", value: title, set: setTitle },
          { label: "Artist Name", value: artist, set: setArtist },
          { label: "Album (Optional)", value: album, set: setAlbum },
          { label: "Genre (Optional)", value: genre, set: setGenre },
        ].map((field, idx) => (
          <div key={idx}>
            <label className="text-white block mb-1">{field.label}</label>
            <input
              type="text"
              value={field.value}
              onChange={(e) => field.set(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              required={idx < 2}
            />
          </div>
        ))}

        <div>
          <label className="text-white block mb-1">Select Emotion</label>
          <select
            value={emotion}
            onChange={(e) => setEmotion(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {[
              "Happy",
              "Sad",
              "Relaxed",
              "Energetic",
              "Romantic",
              "Angry",
              "Chill",
              "Party",
              "Emotional",
            ].map((emo) => (
              <option key={emo} value={emo}>
                {emo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-white block mb-1">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-white block mb-1">Release Date</label>
            <input
              type="date"
              value={releaseDate}
              onChange={(e) => setReleaseDate(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
            />
          </div>
          <div>
            <label className="text-white block mb-1">Duration (in seconds)</label>
            <input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
        </div>

        <label className="flex items-center space-x-2 text-white">
          <input
            type="checkbox"
            checked={isFeatured}
            onChange={(e) => setIsFeatured(e.target.checked)}
          />
          <span>Mark this song as Featured</span>
        </label>

        <label className="block w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded cursor-pointer text-center font-medium transition duration-300">
          📸 Upload Cover Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {image && (
          <>
            <p className="text-sm text-gray-400">Selected: {image.name}</p>
            <img
              src={URL.createObjectURL(image)}
              alt="Preview"
              className="mt-2 max-h-48 rounded-lg shadow-lg"
            />
          </>
        )}

        <label className="block w-full bg-red-600 hover:bg-red-700 text-white p-3 rounded cursor-pointer text-center font-medium transition duration-300">
          🎧 Upload Song File
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="hidden"
          />
        </label>
        {audio && (
          <>
            <p className="text-sm text-gray-400">Selected: {audio.name}</p>
            <audio controls className="w-full mt-2">
              <source src={URL.createObjectURL(audio)} type={audio.type} />
              Your browser does not support the audio tag.
            </audio>
          </>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-lg font-bold text-lg transition duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : "hover:from-pink-500 hover:to-red-600"
          }`}
        >
          {isLoading ? "Uploading..." : "🚀 Upload Song"}
        </button>
      </form>
    </div>
  );
};

export default UploadSong;

import React, { useState } from "react";

const UploadSong = () => {
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [audio, setAudio] = useState(null);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleAudioChange = (e) => {
    setAudio(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("artist", artist);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("audio", audio);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage("Song uploaded successfully!");
        setTitle("");
        setArtist("");
        setDescription("");
        setImage(null);
        setAudio(null);
      } else {
        setMessage(result.message || "Error uploading song");
      }
    } catch (error) {
      console.error("Error uploading song:", error);
      setMessage("Failed to upload song. Try again.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-900 p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-white mb-4">Upload Your Song</h1>
      {message && <p className="text-green-400">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Song Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <input
          type="text"
          placeholder="Artist Name"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded bg-gray-800 text-white"
          required
        />
        
        {/* Custom Upload Image Button */}
        <label className="block w-full bg-gray-700 text-white p-2 rounded cursor-pointer text-center">
          Choose Image
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>
        {image && <p className="text-gray-400">Selected: {image.name}</p>}

        {/* Custom Upload Song Button */}
        <label className="block w-full bg-gray-700 text-white p-2 rounded cursor-pointer text-center">
          Choose Song
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioChange}
            className="hidden"
          />
        </label>
        {audio && <p className="text-gray-400">Selected: {audio.name}</p>}

        <button
          type="submit"
          className="w-full bg-red-500 p-2 rounded text-white hover:bg-red-600 transition-colors"
        >
          Upload Song
        </button>
      </form>
    </div>
  );
};

export default UploadSong;

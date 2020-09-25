import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Video from "./components/Video";
import { db } from "./firebase";
import { Button } from "@material-ui/core";

function App() {
	const [artist, setArtist] = useState("");
	const [title, setTitle] = useState("");
	const [videoId, setVideoId] = useState("");
	const [videos, setVideos] = useState([]);

	useEffect(() => {
		db.collection("videos").onSnapshot((snapshot) =>
			setVideos(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			)
		);
	}, []);

	const handleClick = (e) => {
		e.preventDefault();

		db.collection("videos").add({
			title: title,
			artist: artist,
			videoId: videoId,
		});
		setArtist("");
		setTitle("");
		setVideoId("");
	};

	return (
		<div className="app">
			<Header />
			<div className="app__form">
				<form>
					<input
						placeholder="artist..."
						value={artist}
						onChange={(e) => setArtist(e.target.value)}
					/>
					<input
						placeholder="title..."
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input
						placeholder="videoId..."
						value={videoId}
						onChange={(e) => setVideoId(e.target.value)}
					/>
					<Button variant="contained" type="submit" onClick={handleClick}>
						Add video
					</Button>
				</form>
			</div>
			<div className="app__video">
				{videos.map(({ id, data }) => (
					<Video
						key={id}
						title={data.title}
						artist={data.artist}
						video={data.videoId}
					/>
				))}
			</div>
		</div>
	);
}

export default App;

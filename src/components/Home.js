import React, { useState, useEffect } from "react";
import "./Home.css";
import Video from "./Video.js";
import { db } from "../firebase.js";
import { Button } from "@material-ui/core";

function Home() {
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
		<div className='home'>
			<div className='home__form'>
				<form>
					<input
						placeholder='artist...'
						value={artist}
						onChange={(e) => setArtist(e.target.value)}
					/>
					<input
						placeholder='title...'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<input
						placeholder='videoId...'
						value={videoId}
						onChange={(e) => setVideoId(e.target.value)}
					/>
					<Button variant='contained' type='submit' onClick={handleClick}>
						Add video
					</Button>
				</form>
			</div>
			<div className='home__video'>
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

export default Home;

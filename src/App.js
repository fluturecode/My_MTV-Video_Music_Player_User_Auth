import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Video from "./components/Video";
import { db, auth } from "./firebase";
import { Button, Input } from "@material-ui/core";

function App() {
	// const [{}, dispatch] = useStateValue;
	const [artist, setArtist] = useState("");
	const [title, setTitle] = useState("");
	const [videoId, setVideoId] = useState("");
	const [videos, setVideos] = useState([]);

	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [user, setUser] = useState(null);
	const [open, setOpen] = useState(false);
	const [registerOpen, setRegisterOpen] = useState(false);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				// user is logged in...
				console.log(authUser);
				setUser(authUser);

				if (authUser.displayName) {
					// do not update username
				} else {
					return authUser.updateProfile({
						displayName: username,
					});
				}
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [user, username]);

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

	const handleLogin = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));

		setOpen(false);
	};

	const handleRegister = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.catch((error) => alert(error.message));

		setRegisterOpen(false);
	};

	return (
		<div className='app'>
			<Header />
			<div className='app__form'>
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
			<div className='app__video'>
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

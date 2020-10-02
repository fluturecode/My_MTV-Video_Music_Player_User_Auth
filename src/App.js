import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Video from "./components/Video";
import { db, auth } from "./firebase";
import { Button, makeStyles, Modal, Input } from "@material-ui/core";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		height: "300px",
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		height: 200,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
}));

function App() {
	const [artist, setArtist] = useState("");
	const [title, setTitle] = useState("");
	const [videoId, setVideoId] = useState("");
	const [videos, setVideos] = useState([]);
	const classes = useStyles();
	const [modalStyle] = useState(getModalStyle);
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
					// dont update username
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
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className='app__login'>
						<center>
							<img
								className='app__headerImage'
								src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
								alt=''
							/>
						</center>

						<Input
							placeholder='email'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button onClick={handleLogin}>Login</Button>
					</form>
				</div>
			</Modal>

			<Modal open={registerOpen} onClose={() => setRegisterOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<form className='app__login'>
						<center>
							<img
								className='app__headerImage'
								src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png'
								alt=''
							/>
						</center>
						<Input
							type='text'
							placeholder='username'
							value={username}
							onChange={(e) => setUsername(e.target.value)}
						/>
						<Input
							placeholder='email'
							type='text'
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<Input
							placeholder='password'
							type='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<Button onClick={handleRegister}>Register</Button>
					</form>
				</div>
			</Modal>
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

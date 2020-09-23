import React from "react";
import "./App.css";
import Header from "./components/Header";
import Video from "./components/Video";

function App() {
	return (
		<div className="app">
			<Header />
			{/* <Video title={title} artist={artist} video={video} /> */}
			<Video />
			<Video />
			<Video />
		</div>
	);
}

export default App;

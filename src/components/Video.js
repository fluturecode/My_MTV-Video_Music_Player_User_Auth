import React from "react";
import "./Video.css";
import YouTube from "react-youtube";

function Video() {
	return (
		<div className="video">
			<h1>Song Title</h1>
			<h2>Artist</h2>
			<div clasName="app__player">
				<YouTube videoId="rmzqHSKr44I" />
			</div>
		</div>
	);
}

export default Video;

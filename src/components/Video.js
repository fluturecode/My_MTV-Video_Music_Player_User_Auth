import React from "react";
import "./Video.css";
import YouTube from "react-youtube";

function Video({ title, artist, video }) {
	return (
		<div className="video">
			<div className="video__container">
				<h2>{artist}</h2>
				<h3>{title}</h3>
				<div className="video__player">
					<YouTube videoId={video} />
				</div>
			</div>
		</div>
	);
}

export default Video;

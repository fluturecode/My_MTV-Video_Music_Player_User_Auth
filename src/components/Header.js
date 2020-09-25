import React from "react";
import "./Header.css";
import logo from "../images/download.png";

function Header() {
	return (
		<div className="header">
			<img className="header__logo" src={logo} alt="MTV logo" />
		</div>
	);
}

export default Header;

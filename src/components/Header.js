import React from "react";
import "./Header.css";
import logo from "../images/download.png";
import { Link } from "react-router-dom";
import { useStateValue } from "../context/StateProvider.js";
import { auth } from "../firebase.js";

function Header() {
	const [{ user }, dispatch] = useStateValue();

	const handleAuthentication = () => {
		if (user) {
			auth.signOut();
		}
	};

	return (
		<div className='header'>
			<img className='header__logo' src={logo} alt='MTV logo' />
			<div className='header__nav'>
				<Link to={!user && "/login"}>
					<div onClick={handleAuthentication} className='header__option'>
						<span className='header__optionLineOne'>
							Hello {!user ? "Guest" : user.name}
						</span>
						<span className='header__optionLineTwo'>
							{user ? "Sign Out" : "Sign In"}
						</span>
					</div>
				</Link>
				<Link to='/signup'>
					<div className='header__option'>
						<span>Sign Up</span>
					</div>
				</Link>
			</div>
		</div>
	);
}

export default Header;

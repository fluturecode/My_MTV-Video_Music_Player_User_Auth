import React, { useEffect } from "react"
import "./App.css"
import Header from "./components/Header"
import Home from "./components/Home.js"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Login from "./components/Login.js"
import SignUp from "./components/SignUp.js"
import { auth } from "./firebase"
import { useStateValue } from "./context/StateProvider.js"

function App() {
	// const [{}, dispatch] = useStateValue

	// useEffect(() => {
	// 	// will only run once when the app component loads...
	// 	auth.onAuthStateChanged((authUser) => {
	// 		if (authUser) {
	// 			// the user just logged in / the user was logged in
	// 			dispatch({
	// 				type: "SET_USER",
	// 				user: authUser,
	// 			})
	// 		} else {
	// 			// the user is logged out
	// 			dispatch({
	// 				type: "SET_USER",
	// 				user: null,
	// 			})
	// 		}
	// 	})
	// }, [dispatch])

	return (
		<Router>
			<div className='app'>
				<Switch>
					<Route path='/login'>
						<Login />
					</Route>
					<Route path='/signUp'>
						<SignUp />
					</Route>
					<Route path='/'>
						<Header />
						<Home />
					</Route>
				</Switch>
			</div>
		</Router>
	)
}

export default App

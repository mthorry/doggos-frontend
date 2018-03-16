import React, { Component } from "react";
// import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";

class NavBar extends Component {

	render() {
		return(
			<div>
				<h3> Doggos </h3>
				<Link to="/"><button onClick={this.props.logOut}>Log out</button></Link>
			</div>
		)
	}

}

export default NavBar
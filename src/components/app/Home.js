import React, { Component } from "react";
import axios from "axios";
import { Route, Link, Switch, Redirect } from "react-router-dom";
import NavBar from './NavBar'
import UserFeed from './UserFeed'

class Home extends Component {

	state = {
		user: this.props.user
	}

	render() {
		return(
			<div>
				<NavBar logOut={this.props.logOut}/>
				<h1> Feed </h1>
				<UserFeed user={this.props.user}/>
			</div>
		)
	}

}

export default Home
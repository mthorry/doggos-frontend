import React from "react";
import axios from "axios";
// import { Link, Switch, Route } from "react-router-dom";


class Profile extends React.Component {

	state = {
		photos: []
	}

	componentDidMount = () => {
		this.getUserPhotos()
	}

	getUserPhotos = () => {
		axios
	}

	render() {
		const username = this.props.match.params.username
		console.log(this.props.match.params.username)
		return(
			<div>
			<p> {username}'s Profile </p>
			</div>
		)
	}

}

export default Profile
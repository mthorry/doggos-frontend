import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
import PhotoFeedItem from './PhotoFeedItem'
// import "../../user-feed.css";
const moment = require('moment');


class UserFeed extends React.Component {

	state = {
		users: [],
      	photos: [],
      	likes: [],
      	allUsers: []
	}

	componentDidMount = () => {
		this.getPhotoLikes()
		this.getFeedPhotos()
	}

	getFeedPhotos = () => {
		axios
		.get(`/api/${this.props.user.username}/feed`)
			.then(res => {
				let photos = res.data.feed
				this.setState({
					photos
				});
			})
		.catch(err => {
			console.log(`feed err`, err);
		});
	}

	getPhotoLikes = () => {
		console.log("getPhotoLikes")
		axios
		.get('/api/photos/likes')
			.then( res => {
				console.log('likes', res.data.likes)
				this.setState({
					likes: res.data.likes
				})
			})
	}

	addLike = (e) => {
		let newLike = {username: this.props.user.username, photo_id: e.target.dataset.id}
		this.setState({
			likes: [...this.state.likes, newLike]
		})
		axios
		.post(`/api/${e.target.dataset.username}/photos/${e.target.dataset.id}/likes`)
		.catch(err => {
			console.log(`feed err`, err);
		});
	}

	removeLike = (e) => {
		// console.log(this.state.likes, e.target.dataset.id, this.props.user.username)
		let removeLike = this.state.likes.filter( like => {return like.photo_id == e.target.dataset.id && like.username == this.props.user.username})[0]
		let newLikes = this.state.likes.filter( like => { return like != removeLike})

		// let thisPhoto = this.state.photos.filter( photo => { return photo.id == e.target.dataset.id })[0]
		// console.log(thisPhoto.liked, !thisPhoto.liked)
		// let otherPhotos = this.state.photos.filter( photo => { return photo.id != e.target.dataset.id})

		axios
		.delete(`/api/${e.target.dataset.username}/photos/${e.target.dataset.id}/likes`)
			.then( res => {
				console.log(res.data)
				this.setState({
					likes: newLikes
				})
			})
		.catch(err => {
			console.log(`feed err`, err);
		})
	}

  render() {
    const { users, photos, likes, allUsers } = this.state;
    const { user } = this.props;

    console.log("photos", photos)
    console.log("likes", likes)

//move photo.forEach into 'getPhotos' function
 	photos.forEach( photo => {
 		photo.likes = []
 		photo.liked = false
 		likes.forEach( like => {
 			if (like.photo_id == photo.id ) {
 				photo.likes.push(like)
 			}
 		})
 		photo.likes.forEach( like =>{
 			if (like.username == user.username) {
 				photo.liked = true
 			}
 		})
 	})

    let feedPhotos = photos.map(photo => (
    	<PhotoFeedItem photo={photo} addLike={this.addLike} removeLike={this.removeLike}/>
        ))

    return (
      <div className="feed-photos">
      { feedPhotos }
      </div>
    );
  }
}

export default UserFeed;
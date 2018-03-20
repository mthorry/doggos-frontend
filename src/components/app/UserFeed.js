import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
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
		this.getFeedPhotos()
		this.getPhotoLikes()
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
		let {photos} = this.state
		axios
		.get('/api/likes')
			.then( res => {
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

    console.log("RENDER")

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
          <div className="photo" key={photo.id} id={photo.id}>
              <h3 className="p-bold">{photo.username}</h3>
              <p>{ `${moment(photo.date_created).fromNow()}` }</p>
            <img src={photo.url} alt={photo.caption} width="400" />
            <div className="likes-comments">
            <h4> {photo.likes.length} { photo.likes.length > 1 || photo.likes.length == 0 ? `borks` : `bork` } {photo.liked ? <i className="fas fa-heart"/> : `♡` }</h4>
            	<p>{!photo.liked ? <button onClick={this.addLike} data-id={photo.id} data-username={photo.username}>Add a bork!</button> : <button onClick={this.removeLike} data-id={photo.id} data-username={photo.username}>Un-bork! 💔</button>  }</p>
            </div>
            <div className="photo-bottom">
              <p className="p-caption">{photo.caption} </p>
            </div>
            <br/>
		<hr/>
          </div>
        ))

    return (
      <div className="feed-photos">
      { feedPhotos }
      </div>
    );
  }
}

export default UserFeed;
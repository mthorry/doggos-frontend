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
// router.get('/api/:username/photos/:photo_id/likes', db.getPhotoLikes);
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
		// e.preventDefault()
		// console.log(e.target.dataset, e.target.dataset.id, e.target.dataset.username)
		axios
		.post(`/api/${e.target.dataset.username}/photos/${e.target.dataset.id}/likes`)
			.then( this.getPhotoLikes() )
		.catch(err => {
			console.log(`feed err`, err);
		});
	}

	removeLike = (e) => {
		let thisPhoto = this.state.photos.filter( photo => { return photo.id == e.target.dataset.id })[0]
		console.log(thisPhoto.liked, !thisPhoto.liked)
		let otherPhotos = this.state.photos.filter( photo => { return photo.id != e.target.dataset.id})

		axios
		.delete(`/api/${e.target.dataset.username}/photos/${e.target.dataset.id}/likes`)
			.then( res => {
				console.log(res.data)
				this.setState({
					photos: [thisPhoto, ...otherPhotos]
				})
			})
		.catch(err => {
			console.log(`feed err`, err);
		})
	}

  render() {
    const { users, photos, likes, allUsers } = this.state;
    const { user } = this.props;

    console.log(photos)

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
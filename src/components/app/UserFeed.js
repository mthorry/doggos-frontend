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
		for (var i = 0; i < photos.length; i++) {
		axios
		.get(`/api/${this.props.user.username}/photos/${photos[i]['id']}/likes`)
			.then( res => {
				console.log(res)
				photos[i]['likes'] = res.data.likes
			})
		}
	}

  render() {
    const { users, photos, likes, allUsers } = this.state;
    const { user } = this.props;
 	console.log(photos)

    let feedPhotos = photos.map(photo => (
          <div className="photo" key={photo.id}>
              <h4 className="p-bold">{photo.username}</h4>
              <p>{ `${moment(photo.date_created).fromNow()}` }</p>
            <img src={photo.url} alt={photo.caption} width="400" />
            <div className="likes-comments">
            <p>{ } likes </p>
              <i className="far fa-heart" />
            </div>
            <div className="photo-bottom">
              <p className="p-caption">{photo.caption}</p>
            </div>
            <br/>
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
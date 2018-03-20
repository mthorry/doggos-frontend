import React from "react";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
const moment = require('moment');

class PhotoFeedItem extends React.Component {

  state = {
    photo: this.props.photo,
    liked: this.props.photo.liked
  }

  render() {
    const {photo, likes} = this.state

    console.log(this.state)

    return(
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
    )
  }

}

export default PhotoFeedItem


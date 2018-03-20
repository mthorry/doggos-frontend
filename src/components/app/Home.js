import React from "react";
// import Modal from "react-modal";
import NewPost from "./NewPost";
import UserFeed from "./UserFeed";
import Profile from "./Profile";
import UserProfile from "./UserProfile";
import EditProfile from "./EditProfile";
import axios from "axios";
import { Link, Switch, Route } from "react-router-dom";
// import "../../user-home.css";

class Home extends React.Component {

	state = {
      modalIsOpen: false
    }

  toggleModal = () => {
    let { modalIsOpen } = this.state;
    this.setState({
      modalIsOpen: !modalIsOpen
    })
  }

  renderProfile = () => {
    const { user } = this.props;
    return <Profile user={user} />;
  }

  renderEditProfile = () => {
    const { user } = this.props;

      return <EditProfile user={user} />;
  }

  renderFeed = () => {
    const { user } = this.props;
    return <UserFeed user={user} />;
  }

  render() {
    const { modalIsOpen } = this.state;
    const { logOut, user } = this.props;
    return (
      <div className="user-home">
        <div className="header-bar">
          <div className="header">
            <div className="left-top">
              <Link to="/">
                <i class="fas fa-camera-retro" />
                {"    "}Self-ish
              </Link>
            </div>
            <div className="search-box">
              <input
                type="search"
                name="search"
                id="search"
                placeholder="search"
              />
            </div>
            <div className="right-top">
              <div className="user-buttons">
                  <NewPost user={user} toggleModal={this.toggleModal} />

                <button>
                  <Link to="/profile">
                    <i class="far fa-user fa-2x" />
                  </Link>
                </button>

                <button onClick={this.toggleModal} className="newPost">
                  <i class="fa fa-plus-square fa-2x" />
                </button>

                <button onClick={logOut}>
                  <i class="fas fa-sign-out-alt fa-2x" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <Route exact path="/home" component={this.renderFeed} />
        <Route exact path="/profile" component={this.renderProfile} />
        <Route exact path="/profile/edit" component={this.renderEditProfile} />
        <Route exact path="/user/:id" user={user} component={UserProfile} />
      </div>
    );
  }
}

export default Home;

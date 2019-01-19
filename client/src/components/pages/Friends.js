import React, { Component } from "react";
import SearchForm from "../SearchForm";
import FriendResults from "../FriendResults";
import FriendSidebar from "../FriendSidebar";
import friendAPI from "../../utils/friendAPI";
import userAPI from "../../utils/userAPI";
import Footer from "../Footer";

class Friends extends Component {
  state = {
    search: "",
    results: [],
    saved: [],
    requests: [],
    status: "",
    message: ""
  };

  handleInputChange = event => {
    const name = event.target.name;
    const value = event.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSearch = event => {
    event.preventDefault();
    this.searchFriends(this.state.search)
  };

  searchFriends = query => {
    const results = [];
    friendAPI
      .findUserByName(query)
      .then(res => {
        if (!res.data.message) {
          res.data.forEach(friend => {
            results.push({
              type: "friend",
              firstName: friend.firstName ? friend.firstName : "",
              lastName: friend.lastName ? friend.lastName : "",
              username: friend.username ? friend.username : "",
              apiId: friend._id
            });
          })
          this.setState({ message: "" });
        } else {
          if (res.data.message) {
            this.setState({
              message: res.data.message
            })
          } else {

          }
        }
      })
      .then(() => this.setState({ results }))
      .catch(err => console.log(err));
  };

  handleAddFriend = requestTo => {
    friendAPI
      .newFriendRequest(requestTo)
      .then(res => {
        if (res.data.message) {
          // alert("You already have a pending request with that user");
          this.setState({
            message: res.data.message
          })
        } else {
          alert("Friend Request Sent!");
          this.setState({
            message: "Friend Request Sent!"
          })
        }
      })
      .then(() => {
        this.setState({
          results: [],
          search: ""
        });
        this.getFriends();
      })
      .catch(err => console.log(err));
  };

  getFriends = () => {
    userAPI
      .getUserMedia()
      .then(res => {
        this.setState({ saved: res.data.friends });
      })
      .catch(err => console.log(err));
  };

  handlePendingRequest = () => {
    friendAPI
      .pendingRequest()
      .then(res => {
        if(!res.data.message){
        this.setState({ requests: res.data, message: "" });
      } else {
        this.setState({message: res.data.message})
      }
      })
      .catch(err => console.log(err));
  };

  handleAcceptRequest = (id, status) => {
    friendAPI
      .handleFriendRequest(id, status)
      .then(res => {
        this.getFriends();
        this.handlePendingRequest();
      })
      .catch(err => console.log(err));
  };

  handleDeclineRequest = (id, status) => {
    friendAPI
      .handleFriendRequest(id, status)
      .then(res => {
        console.log(res);
        this.getFriends();
        this.handlePendingRequest();
      })
      .catch(err => console.log(err));
  };

  handleRemoveFriend = id => {
    friendAPI.removeFriend(id)
      .then(res => {
        console.log(res);
        this.getFriends()
      })
      .catch(err => console.log(err));
  }

  clearResults = () => {
    this.setState({
      results: [],
      search: ""
    });
  };

  componentDidMount() {
    this.getFriends();
    this.handlePendingRequest();
    window.scrollTo(0, 0)
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-9 main">
              <SearchForm
                search={this.state.search}
                handleInputChange={this.handleInputChange}
                handleSearch={this.handleSearch}
                mediaType="user"
              />
              {this.state.message.length > 0 ? <p className="warning">{this.state.message}</p> : ""}
              {this.state.results.length ? (
                <div className="media-wrapper">
                  <h2 className="text-center">Results</h2>
                  <button onClick={this.clearResults} className="btn-clear">
                    Clear <i className="icon icon-collapse" />
                  </button>
                  <div className="clearfix" />
                  <FriendResults
                    items={this.state.results}
                    clearResults={this.clearResults}
                    resultType="results"
                    handleAddFriend={this.handleAddFriend}
                  />
                </div>
              ) : (
                  ""
                )}
              <hr />
              {this.state.saved ? (
                <div className="media-wrapper">
                  <h2 className="text-center">My Friends</h2>
                  <FriendResults
                    items={this.state.saved}
                    resultType="saved"
                    handleRemoveFriend={this.handleRemoveFriend}
                  />
                </div>
              ) : (
                  <p className="text-center empty-media-msg">
                    Use the search bar above to find and add friends!
                </p>
                )}
            </div>
            <FriendSidebar
              items={this.state.requests}
              handlePendingRequest={this.handlePendingRequest}
              handleAcceptRequest={this.handleAcceptRequest}
              handleDeclineRequest={this.handleDeclineRequest}
              mediaType="friend"
            />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Friends;

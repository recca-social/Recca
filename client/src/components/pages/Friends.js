import React, { Component } from "react";
import SearchForm from "../SearchForm";
import FriendResults from "../FriendResults";
import FriendSidebar from "../FriendSidebar";
import userAPI from "../../utils/userAPI";

// import Header from "../Header";
// import API from "../utils/API";

class Friends extends Component {
  state = {
    search: "",
    results: [],
    saved: [],
    requests: [],
    status: ""
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
    this.searchFriends(this.state.search);
    console.log(this.state.search);
  };

  // =========================================================================
  // THIS IS ONLY SEARCHING FOR MYSELF
  // THE USER CONTROLLER METHOD WAS NOT WORKING FOR TAKING IN THE SEARCH QUERY
  searchFriends = query => {
    const results = [];
    console.log(query);
    userAPI
      .findUserByName(query)
      .then(res => {
        res.data.forEach(friend => {
          results.push({
            type: "friend",
            firstName: friend.firstName ? friend.firstName : "",
            lastName: friend.lastName ? friend.lastName : "",
            username: friend.username ? friend.username : "",
            apiId: friend._id
          });
        });
        console.log(res.data);
        console.log(results);
      })
      .then(() => this.setState({ results }))
      .catch(err => console.log(err));
  };

  handleAddFriend = requestTo => {
    userAPI
      .newFriendRequest(requestTo)
      .then(res => {
        console.log(res.data.message);
        if (
          res.data.message ===
          "Hey, this person all ready got a friend request from you!"
        ) {
          alert("You already sent a friend request to them!");
        } else {
          alert("Friend Request Sent!");
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
        console.log(res.data.friends);
        this.setState({ saved: res.data.friends });
      })
      .catch(err => console.log(err));
  };

  // handleFriendRequest = status => {
  //   userAPI
  //     .handleFriendRequest(status)
  //     .then(res => {
  //       // I THINK I NEED MORE HERE
  //       console.log(res);
  //     })
  //     .catch(err => console.log(err));
  // };

  handlePendingRequest = () => {
    userAPI
      .pendingRequest()
      .then(res => {
        console.log(res.data);
        this.setState({ requests: res.data });
      })
      .catch(err => console.log(err));
  };

  // HANDLE ACCEPT FRIEND
  handleAcceptFriend = status => {
    // console.log(status);
    userAPI
      .handleFriendRequest(status)
      .then(this.getFriends())
      .catch(err => console.log(err));
  };

  // HANDLE DECLINE FRIEND
  handleDeclineFriend = status => {
    console.log(status);
    userAPI
      .handleFriendRequest(status)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
  };

  clearResults = () => {
    this.setState({ results: [] });
  };

  componentDidMount() {
    this.getFriends();
    this.handlePendingRequest();
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-9 main">
            <SearchForm
              search={this.state.search}
              handleInputChange={this.handleInputChange}
              handleSearch={this.handleSearch}
            />
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
          </div>
          <FriendSidebar
            items={this.state.requests}
            // handleFriendRequest={this.handleFriendRequest}
            handlePendingRequest={this.handlePendingRequest}
            handleAcceptFriend={this.handleAcceptFriend}
            handleDeclineFriend={this.handleDeclineFriend}
            mediaType="friend"
          />
        </div>
      </div>
    );
  }
}

export default Friends;

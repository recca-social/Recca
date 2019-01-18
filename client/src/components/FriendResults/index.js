import React from "react";
import PostModal from "../PostModal"
import "./FriendResults.scss";

const FriendResults = props => {
  return (
    <div>
      {props.items ? props.items.map(item => (
        <div key={item._id} id={item._id} className={"media-item " + (item._id ? "media-item--friend" : "")}>
          {item.firstName ?
            <p className="media-item__friend">
              <i className="icon icon-user"> </i><strong>{item.username}</strong> ({item.firstName} {item.lastName})
            </p>
          : ""}
          {props.resultType === "results" ?
            <div className="media-item__buttons media-item__buttons--results">
              <button onClick={() => props.handleAddFriend(item.apiId)} className="btn btn-add">Add Friend <i className="icon icon-user-plus"></i></button>
            </div>
          : ""}
              
          <PostModal 
            postText={props.postText}
          />

        </div>
      )) : ""}
    </div>
  );
}

export default FriendResults;
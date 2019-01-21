import React from "react";
import "./FriendResults.scss";

const FriendResults = props => {
  return (
    <div>
      {props.items ? props.items.map(item => (
        <div key={item.username} id={item._id} className={"friend-item " + (item._id ? "friend-item--friend" : "friend-item--result")}>
          {item.username ?
            <p className="friend-details">
              <i className="icon icon-user"> </i><strong>{item.firstName} {item.lastName}</strong> ({item.username})
            </p>
          : ""}
          {props.resultType === "results" ?
            <div id={item.apiId} className="friend-item__buttons friend-item__buttons--results">
              <button onClick={() => props.handleAddFriend(item.apiId)} className="btn btn-add" data-toggle="modal" data-target={"#modal-" + item.username}>Add Friend <i className="icon icon-user-plus"></i></button>
            </div>
          : ""}
        </div>
      )) : ""}
    </div>
  );
}

export default FriendResults;
import React from "react";
// import FriendModal from "../FriendModal";
import "./FriendResults.scss";

const FriendResults = props => {
  return (
    <div>
      {props.items ? props.items.map(item => (
        <div key={item.username} id={item._id} className={"media-item " + (item._id ? "media-item--friend" : "")}>
          {item.username ?
            <p className="media-item__friend">
              <i className="icon icon-user"> </i><strong>{item.username}</strong> ({item.firstName} {item.lastName})
            </p>
          : ""}
          {props.resultType === "results" ?
            <div id={item.apiId} className="media-item__buttons media-item__buttons--results">
              <button onClick={() => props.handleAddFriend(item.apiId)} className="btn btn-add" data-toggle="modal" data-target={"#modal-" + item.apiId}>Add Friend <i className="icon icon-user-plus"></i></button>
            </div>
          : ""}
              
          {/* <FriendModal 
            apiId={item.apiId}
          /> */}

        </div>
      )) : ""}
    </div>
  );
}

export default FriendResults;
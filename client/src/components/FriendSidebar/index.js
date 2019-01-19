import React from "react";
import "./FriendSidebar.scss";

const FriendSidebar = props => {
  return (
    <div className="col-md-3 sidebar">
      <div className="sidebar__title">Pending {props.mediaType} Requests</div>
      <div className="sidebar__media">
        {// Check for friend requests and check that there is at least 1 pending request
        props.items.filter(item => item.status === "pending").length >= 1 ? 
        // Filter for pending requests in the current type
        props.items.filter(item => item.status === "pending").map(item => (
          <div key={item._id} className="sidebar__media-item sidebar__media-item--active">
            <p>
                <i className="icon icon-user"> </i><strong>{item.participants[0].firstName} {item.participants[0].lastName}</strong> ({item.participants[0].username})
            </p>
            <div className="accept-btn-container">
                <button onClick={() => props.handleAcceptRequest(item._id, "accepted") } className="btn btn-accept">Accept <i className="icon icon-check"> </i></button>
            </div>
            <div className="decline-btn-container">
                <button onClick={() => props.handleDeclineRequest(item._id, "rejected") } className="btn btn-decline">Decline <i className="icon icon-cancel"> </i></button>
            </div>
            <div className="clearfix"></div>
          </div>
        )) : <p className="text-center sidebar__message">Friend requests will display here</p> }
      </div>
    </div>
  )
}

export default FriendSidebar;
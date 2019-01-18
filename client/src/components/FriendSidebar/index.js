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
                <i className="icon icon-user"> </i><strong>{item.participants[0].username}</strong> ({item.participants[0].firstName} {item.participants[0].lastName})
            </p>
            <div className="accept-btn-container">
                <button onClick={() => props.handleAcceptRequest(item._id, "accepted") } className="btn btn-accept">Accept <i className="icon icon-check"> </i></button>
            </div>
            <div className="decline-btn-container">
                <button onClick={() => props.handleDeclineRequest(item._id, "rejected") } className="btn btn-decline">Decline <i className="icon icon-cancel"> </i></button>
            </div>
            <div className="clearfix"></div>
          </div>
        )) 
        
        :   <p className="text-center sidebar__message">
                {/* {props.mediaType}{props.mediaType !== "music" ? "s" : "" }  */}
                Friend requests will display here
            </p> }
      </div>

      {/* <div className="sidebar__title">Completed {props.mediaType}{props.mediaType !== "music" ? "s" : "" }</div>
      <div className="sidebar__media">
        {// Check for media items and check that there is at least 1 completed item
        props.items.filter(item => item.complete === true).length >= 1 ? 
        // Filter for completed items in the current type
        props.items.filter(item => item.complete === true && item.type === props.mediaType).map(item => (
          <div key={item._id} className="sidebar__media-item sidebar__media-item--complete">
            {item.image ? <img src={item.image} alt={item.title} className="sidebar__img" /> : ''}
            <a href={'#' + item.apiId} className="sidebar__link"><strong>{item.title}</strong></a>
            <p>{displayMetadata(item.type, item.creator, item.platform)}</p>
            <button onClick={() => props.toggleComplete(item._id) } className="btn-active">
              <i className="icon icon-eye"><span className="sr-only">Set inactive</span></i>
            </button>
            <div className="clearfix"></div>
          </div>
        )) : <p className="text-center sidebar__message">Completed {props.mediaType}{props.mediaType !== "music" ? "s" : "" } will display here</p> }
      </div> */}

    </div>
  )
}

export default FriendSidebar;
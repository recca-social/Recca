import React from "react";

const FriendModal = props => (
  <div className="modal" id={"modal-" + props.username} onClick={props.handleClose} style={{display: props.show ? "block" : "none"}}>
    <div className="modal-content">
            <span className="close" onClick={props.handleClose}>&times;</span>
            <p className="modal-text">Friend Request Sent!</p>
        </div> 
  </div>
);

export default FriendModal;
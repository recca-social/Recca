import React from "react";
import "./feed-modal.scss"

const FeedModal = props => (
    <div id="feed-modal" className="feed-modal" onClick={props.handleClose} style={{display: props.show ? "block" : "none"}}>
        <div className="feed-modal-content">
            <span className="close" onClick={props.handleClose}>&times;</span>
            <p className="feed-modal-text">This item is already saved to your list.</p>
        </div> 
    </div>
);

export default FeedModal;
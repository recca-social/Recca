import React from "react";
import "./feed-modal.scss"

const FeedModal = props => (

<div id="feedModal" className="modal" style={{visibility: props.show ? "visible" : "hidden"}}>
        <div className="modal-content">
            <span className="close">&times;</span>
            <p>Some text in the Modal..</p>
        </div> 
</div>
  
);

export default FeedModal;
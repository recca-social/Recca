import React from "react";

const FriendModal = props => (
  <div className="modal fade" id={"modal-" + props.username} tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          Hello
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Hello World
        </div>
      </div>
    </div>
  </div>
);

export default FriendModal;
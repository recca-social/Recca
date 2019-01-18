import React from "react";

const FriendModal = props => (
  <div className="modal fade" id={"modal-" + props.apiId} tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          Hello
        </div>
      </div>
    </div>
  </div>
);

export default FriendModal;
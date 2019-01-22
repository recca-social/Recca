import React from "react";
import "./post-modal.scss";

const PostModal = props => (
  <div className="modal fade" id={"modal-" + props.apiId} tabIndex="-1" role="dialog" aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <img
            alt={props.title} className="media-item__img"
            src={props.image}
          />
          <div className="modal__media-details">
            <h5 className="modal__title">{props.title}</h5>
            <p className="modal__creator">{props.creator}</p>
          </div>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <form>
            <div className="form-group">
              <label className="sr-only" htmlFor="search">Search:</label>
              <textarea
                className="form-control"
                rows="3"
                maxLength="420"
                placeholder="What makes it good?"
                onChange={props.handleInputChange}
                value={props.postText}
                name="postText"
                type="text"></textarea>
              <p className="char-count"><span className={props.postText.length >= 410 ? "char-count__limit" : ""}>{props.postText.length}</span>/420</p>
            </div>
          </form>
          
        </div>
        <button type="button" className="btn btn-recommend" onClick={() => props.handleRecommend(props.media)} data-dismiss="modal">Post recommendation <i className="icon icon-star"></i></button>
      </div>
    </div>
  </div>
);

export default PostModal;
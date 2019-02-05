import React from "react";
import PostModal from "../PostModal";
import "./media-item.scss";

function SavedResult(props) {
  return (
    <div id={props.item.apiId} className={'media-item media-item--saved ' + (props.item.active ? "media-item--active" : props.item.complete ? 'media-item--complete' : '')}>
      <img
        alt={props.item.title} className="media-item__img media-item__img--mobile"
        src={props.item.image}
      />
      <div className="media-item__top">
        <img
          alt={props.item.title} className="media-item__img"
          src={props.item.image}
        />
        <div className="media-item__main">
          <h3 className="media-item__title">
            {props.item.link ? 
              <a href={props.item.link} target="_blank" rel="noopener noreferrer">{props.item.title}&nbsp;<i className="icon icon-link-ext"></i></a>
              : props.item.title }
              {props.item.year ? 
                <span className="media-item__year"> ({props.item.year})</span>
              : ""}
          </h3>

          {props.item.creator ? 
            <p className="media-item__metadata media-item__creator">
              <strong>{props.typeCheckPluralizer(props.item.type, props.item.creator)}: </strong>
              {props.item.creator}
            </p>
          : ""}

          {props.item.genre ?
            <p className="media-item__metadata media-item__genre">
              <strong>{props.genreText(props.item.genre)}</strong>
              {props.item.genre}
            </p>
          : ""}

          {props.item.platform ?
            <p className="media-item__metadata media-item__platform">
              <strong>{props.platformText(props.item.platform)}</strong>
              {props.item.platform}
            </p>
          : ""}

          {props.item.rating ?
            <p className="media-item__metadata media-item__rating">
              <strong>Rating: </strong>
              {props.mediaType === "game" ? Math.round(props.item.rating) : props.item.rating }
            </p>
          : ""}

        </div>
      </div>

      <div className="clearfix"></div>

      <div className="media-item__buttons media-item__buttons--saved">
        <button className="btn btn-recommend" data-toggle="modal" data-target={"#modal-" + props.item.apiId}>Recommend <i className="icon icon-star"></i></button>
        {props.mediaType !== "movie" ?
          <button onClick={() => props.toggleActive(props.item._id) } className="btn btn-active">
            {props.item.active ?
            <span>Active <i className="icon icon-eye"></i></span> :
            <span>Active <i className="icon icon-eye-off"></i></span>}
          </button>
        : ""}
        <button onClick={() => props.toggleComplete(props.item._id) } className="btn btn-complete">
          {props.item.complete ? 
          <span>Complete <i className="icon icon-check"></i></span> :
          <span>Complete <i className="icon icon-check-empty"></i></span>}
        </button>
        <button onMouseUp={() => props.handleDelete(props.item._id) } className="btn btn-remove">Remove <i className="icon icon-trash-empty"></i></button>       
      </div>
              
      <PostModal 
        postText={props.postText}
        handleInputChange={props.handleInputChange}
        handleRecommend={props.handleRecommend}
        media={props.item}
        image={props.item.image}
        title={props.item.title}
        creator={props.item.creator}
        apiId={props.item.apiId}
      />
    </div>
  )
}

export default SavedResult;
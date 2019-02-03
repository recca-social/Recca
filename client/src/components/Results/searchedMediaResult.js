import React from "react";
import PostModal from "../PostModal";
import Truncate from 'react-truncate';
import "./media-item.scss";

function searchedMediaResult(props) {
  return (
    <div key={props.item.apiId} id={props.item.apiId} className='media-item'>
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
          {props.item.description && props.resultType === "results" ? <p className="media-item__description"><Truncate lines={4} ellipsis={"..."}>{props.item.description}</Truncate></p>
          : props.mediaType !== "music" ? <p className="media-item__description">No description available</p> : ""}

          {props.mediaType === "music" && props.item.creator ?
            <p className="media-item__metadata media-item__creator">
              <strong>{props.item.creator}</strong>
            </p>
          : ""}
        </div>
      </div>

      {props.item.creator && props.mediaType !== "music" ? 
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

      <div className="clearfix"></div>
              
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

export default searchedMediaResult;
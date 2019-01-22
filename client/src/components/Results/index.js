import React from "react";
import PostModal from "../PostModal";
import Truncate from 'react-truncate';
import "./media-item.scss";

function Results(props) {
  function typeCheckPluralizer(type, string) {
    var creatorTitle;
    
    if (type === "book") {
      creatorTitle = "Author"
    } else if (type === "music") {
      creatorTitle = "Artist"
    } else if (type === "movie") {
      creatorTitle = "Director"
    } else if (type === "show") {
      creatorTitle = "Writer"
    } else {
      return creatorTitle = "Creator"
    }

    if (string.includes(",")) {
      return `${creatorTitle}s`
    } else {
      return creatorTitle;
    }
  }
  function platformText(string) {
    if (string.includes(",")) {
      return "Platforms: "
    } else {
      return "Platform: "
    }
  }
  function genreText(string) {
    if (string.includes(",")) {
      return "Genres: "
    } else {
      return "Genre: "
    }
  }
  return (
    <div>
      {props.items ? props.items.filter(item => item.type === props.mediaType && !item.complete).map(item => (
        <div key={item.apiId} id={item.apiId} className={'media-item ' + (item.active ? "media-item--active" : item.complete ? 'media-item--complete' : '')}>
          <img
            alt={item.title} className="media-item__img media-item__img--mobile"
            src={item.image}
          />
          <div className="media-item__top">
            <img
              alt={item.title} className="media-item__img"
              src={item.image}
            />
            <div className="media-item__main">
              <h3 className="media-item__title">
                {item.link ? 
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}&nbsp;<i className="icon icon-link-ext"></i></a>
                  : item.title }
                  {item.year ? 
                    <span className="media-item__year"> ({item.year})</span>
                  : ""}
              </h3>
              {item.description ? <p className="media-item__description"><Truncate lines={4} ellipsis={"..."}>{item.description}</Truncate></p>
              : ""}
            </div>
          </div>

          {props.mediaType === "music" && item.creator ?
            <p className="media-item__metadata media-item__creator">
              <strong>{item.creator}</strong>
            </p>
          : ""}

          {item.creator && props.mediaType !== "music" ? 
            <p className="media-item__metadata media-item__creator">
              <strong>{typeCheckPluralizer(item.type, item.creator)}: </strong>
              {item.creator}
            </p>
          : ""}

          {item.genre ?
            <p className="media-item__metadata media-item__genre">
              <strong>{genreText(item.genre)}</strong>
              {item.genre}
            </p>
          : ""}

          {item.platform ?
            <p className="media-item__metadata media-item__platform">
              <strong>{platformText(item.platform)}</strong>
              {item.platform}
            </p>
          : ""}

          {item.rating ?
            <p className="media-item__metadata media-item__rating">
              <strong>Rating: </strong>
              {props.mediaType === "game" ? Math.round(item.rating) : item.rating }
            </p>
          : ""}

          <div className="clearfix"></div>
          
          {props.resultType === "saved" ? 
            <div className="media-item__buttons media-item__buttons--saved">
              <button className="btn btn-recommend" data-toggle="modal" data-target={"#modal-" + item.apiId}>Recommend <i className="icon icon-star"></i></button>
              {props.mediaType !== "movie" ?
                <button onClick={() => props.toggleActive(item._id) } className="btn btn-active">
                  {item.active ?
                  <span>Active <i className="icon icon-eye"></i></span> :
                  <span>Active <i className="icon icon-eye-off"></i></span>}
                </button>
              : ""}
              <button onClick={() => props.toggleComplete(item._id) } className="btn btn-complete">
                {item.complete ? 
                <span>Complete <i className="icon icon-check"></i></span> :
                <span>Complete <i className="icon icon-check-empty"></i></span>}
              </button>
              <button onClick={() => props.handleDelete(item._id) } className="btn btn-remove">Remove <i className="icon icon-trash-empty"></i></button>       
            </div>
          : props.resultType === "results" ?
            <div className="media-item__buttons media-item__buttons--results">
              <button onClick={() => props.handleSave(item.apiId)} className="btn btn-save">Save <i className="icon icon-bookmark-empty"></i></button>
              <button className="btn btn-recommend" data-toggle="modal" data-target={"#modal-" + item.apiId}>Recommend <i className="icon icon-star"></i></button>
            </div>
          : ""}
              
          <PostModal 
            postText={props.postText}
            handleInputChange={props.handleInputChange}
            handleRecommend={props.handleRecommend}
            media={item}
            image={item.image}
            title={item.title}
            creator={item.creator}
            apiId={item.apiId}
          />

        </div>
      )) : ""}
    </div>
  );
}

export default Results;
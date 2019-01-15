import React from "react";
import PostModal from "../PostModal"
import "./media-item.scss";

function Results(props) {
  function creatorText(type, string) {
    if (type === "book") {
      if (string.includes(",")) {
        return "Authors: "
      } else {
        return "Author: "
      }
    } else if (type === "music") {
      if (string.includes(",")) {
        return "Artists: "
      } else {
        return "Artist: "
      }
    } else if (type === "movie") {
      if (string.includes(",")) {
        return "Directors: "
      } else {
        return "Director: "
      }
    } else if (type === "show") {
      if (string.includes(",")) {
        return "Writers: "
      } else {
        return "Writer: "
      }
    } else if (type === "game") {
      if (string.includes(",")) {
        return "Studios: "
      } else {
        return "Studio: "
      }
    } else {
      return "Creator: "
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
      {props.items ? props.items.filter(item => item.type === props.mediaType).map(item => (
        <div key={item.apiId} id={item.apiId} className={'media-item ' + (item.active ? "media-item--active" : item.complete ? 'media-item--complete' : '')}>
          <div className="media-item__header">
            <img
              alt={item.title} className="media-item__img"
              src={item.image}
            />
            <div className="media-item__details">
              <h3 className="media-item__title">
                {item.link ? 
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}&nbsp;<i className="icon icon-link-ext"></i></a>
                  : item.title }
                  {item.year ? 
                    <span className="media-item__year"> ({item.year})</span>
                  : ""}
              </h3>
              <p className="media-item__description">{item.description}</p>
            </div>
          </div>

          {item.creator ? 
            <p className="media-item__metadata media-item__creator">
              <strong>{creatorText(item.type, item.creator)}</strong>
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
          
          {props.resultType === "saved" ? 
            <div className="media-item__buttons media-item__buttons--saved">
              <button className="btn btn-recommend" data-toggle="modal" data-target={"#modal-" + item.apiId}>Recommend <i className="icon icon-star"></i></button>
              <button onClick={() => props.toggleActive(item._id) } className="btn btn-active">
                {item.active ?
                <span>Active <i className="icon icon-eye"></i></span> :
                <span>Active <i className="icon icon-eye-off"></i></span>}
              </button>
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
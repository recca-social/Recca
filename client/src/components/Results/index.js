import React from "react";
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
    } else if (type === "movie" || type === "show") {
      if (string.includes(",")) {
        return "Directors: "
      } else {
        return "Director: "
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
  return (
    <div>
      {props.items ? props.items.map(item => (
        <div className={"media-item " + (item.active ? "media-item--active" : '')} key={item.apiId}>
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
              </h3>
              <p className="media-item__description">{item.description}</p>
            </div>
          </div>

          {item.creators ? 
            <p className="media-item__creator">
              <strong>
                {creatorText(item.type, item.creators)}
              </strong>
              {item.creators}
            </p>
          : ""}

          {item.genre ?
            <p className="media-item__genre">
              <strong>Genre: </strong>{item.genre}
            </p>
          : ""}
          
          {props.resultType === "saved" ? 
            <div className="media-item__buttons media-item__buttons--saved">
              <button onClick={() => props.handleRecommend(item._id) } className="btn btn-recommend">Recommend <i className="icon icon-star-filled"></i></button>
              <button onClick={() => props.handleActive(item._id) } className="btn btn-active">
                {item.active ?
                <span>Set Active <i className="icon icon-eye"></i></span> :
                <span>Unset Active <i className="icon icon-eye-off"></i></span>}
              </button>
              <button onClick={() => props.handleComplete(item._id) } className="btn btn-complete">Complete <i className="icon icon-check-filled"></i></button>
              <button onClick={() => props.handleDelete(item._id) } className="btn btn-remove">Remove <i className="icon icon-trash"></i></button>       
            </div>
          : props.resultType === "results" ?
            <div className="media-item__buttons media-item__buttons--results">
              <button onClick={() => props.handleSave(item.apiId)} className="btn btn-save">Save <i className="icon icon-bookmark"></i></button>
            </div>
          : ""}
              
        </div>
      )) : ""}
    </div>
  );
}

export default Results;
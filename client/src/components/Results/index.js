import React from "react";
import "./media-item.scss";

function Results(props) {
  return (
    <div>
      {props.items ? props.items.map(item => (
        <div className="media-item" key={item.apiId}>
          <div className="media-item__header">
            <img
              alt={item.title} className="media-item__img"
              src={item.image}
            />
            <div className="media-item__details">
              <h3 className="media-item__title">{item.title}</h3>
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="btn btn-more">View <i className="icon icon-link-ext"></i></a>
              <p className="media-item__description">{item.description}</p>
            </div>
          </div>
          <p className="media-item__byline">
            {item.type === "book" ? "Author(s): " : ""}<strong>{item.creators}</strong>
          </p>

          <div className="media-item__buttons">
            <button onClick={() => props.handleRecommend(item.id) } className="btn btn-recommend">Recommend <i className="icon icon-star-filled"></i></button>
            <button onClick={() => props.handleActive(item.id) } className="btn btn-active">Set Active <i className="icon icon-eye"></i></button>
            <button onClick={() => props.handleComplete(item.id) } className="btn btn-complete">Complete <i className="icon icon-check-filled"></i></button>
            {/* <button onClick={() => props.handleSave(item.apiId)} className="btn btn-save">Save <i className="icon icon-bookmark"></i></button> */}
            <button onClick={() => props.handleDelete(item.id) } className="btn btn-remove">Remove <i className="icon icon-trash"></i></button>
              
          </div>
        </div>
      )) : ""}
    </div>
  );
}

export default Results;
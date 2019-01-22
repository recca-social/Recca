import React from "react";
import "./feed-item.scss";
import moment from "moment";

function Results(props) {

  function parseDate(date) {
    var newDate = moment(date).format("MMM-DD-YY hh:mm a")
    return newDate
  }

  return ( 
    <div className="feed-item-wrapper col-12">
      {props.items && props.items.length > 0 ? props.items.map(item => (
        <div key={item._id} id={item.apiId} className={'feed-item mx-auto'}>
          <p className="feed-item__user">
            <strong>{item.postAuthor}</strong> <span>recommends...</span>
          </p>
          <h5 className="feed-item__title">
            <a href={item.link ? item.link : ""} target="_blank" rel="noopener noreferrer">{item.title}&nbsp;<i className="icon icon-link-ext"></i></a>
          </h5>
          {/* {<p className="feed-item__date">{" " + parseDate(item.created_at)}</p>} */}
          <img
            alt={item.title} className="feed-item__img"
            src={item.image}
          />
          {item.postText ?
            <p className="feed-item__description">{item.postText}</p>
          : ""}

          <div className="feed-item__buttons feed-item__buttons--results">
            <button onClick={() => props.handleSave(item.apiId)} className="btn btn-save">Save {item.type}<i className="icon icon-bookmark-empty"></i></button>
          </div>

          <div className="clearfix"></div>
        </div>
      )) :
      <p className="message mx-auto">No recomendations to display</p> }
    </div>
  );
}

export default Results;
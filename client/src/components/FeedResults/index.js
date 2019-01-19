import React from "react";
import "./feed-item.scss";
import moment from "moment";

function Results(props) {
  // function typeCapitalized(string){
  //   const upper = string.replace(/^\w/, c => c.toUpperCase());
  //   return upper
  // }

  function parseDate(date) {
    var newDate = moment(date).format("MMM-DD-YY hh:mm a")
    return newDate
  }

  return ( 
    <div>
      {props.items ? props.items.map(item => (
        <div key={item._id} id={item.apiId} className={'feed-item'}>
          <div className="feed-item__header">
            <img
              alt={item.title} className="feed-item__img"
              src={item.image}
            />
            <div className="feed-item__details">
              <p className="feed-item__title font-weight-bold">
                <strong>{item.postAuthor}</strong> recommended {item.type === "music" ? "an album" : ("a " + item.type)}
              </p>
              <p className="feed-item__date">{" " + parseDate(item.created_at)}</p>
              <h5 className="feed-item__title">
                <a href={item.link ? item.link : ""} target="_blank" rel="noopener noreferrer">{item.title}&nbsp;<i className="icon icon-link-ext"></i></a>
              </h5>
              {item.postText ?
                <div>
                  <p className="feed-item__description">{item.postText}</p>
                </div>
              : ""}
            </div>
          </div>

            <div className="feed-item__buttons feed-item__buttons--results">
              <button onClick={() => props.handleSave(item.apiId)} className="btn btn-save">Save <i className="icon icon-bookmark"></i></button>
            </div>

        </div>
      )) : ""}
    </div>
  );
}

export default Results;
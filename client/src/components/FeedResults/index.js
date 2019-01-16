import React from "react";
import "./media-item.scss";
import moment from "moment";

function Results(props) {
  function typeCapitalized(string){
    const upper = string.replace(/^\w/, c => c.toUpperCase());
    return upper
  }

  function parseDate(date) {
    var newDate = moment(date).format("MMM-DD-YY hh:mm a")
    return newDate
  }

  return ( 
    <div>
      {props.items ? props.items.map(item => (
        <div key={item._id} id={item.apiId} className={'media-item'}>
          <div className="media-item__header">
            <img
              alt={item.title} className="media-item__img"
              src={item.image}
            />
            <div className="media-item__details">
              <h1 className="media-item__title font-weight-bold">Recommended by: {item.postAuthor}</h1>
              <h5 className="media-item__title">
                {item.link ? 
                  <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}&nbsp;<i className="icon icon-link-ext"></i></a>
                : item.title }
              </h5>
              {item.genre ?
                <p className="media-item__genre">
                  <strong>Type: </strong>{typeCapitalized(item.type)}
                </p>
              : ""}
              {item.postText ?
              <div>
                <span className="media-item__description font-weight-bold">{item.postAuthor} says:</span>
                <p className="media-item__description">{item.postText}</p>
              </div>
              : 
              <div>
                <span className="media-item__description font-weight-bold">Web Description:</span>
                <p className="media-item__description mb-3">{item.description}</p>
              </div>
                }
            
            </div>
          </div>

          {item.creator ? 
            <p className="media-item__creator">
              <strong>
                Posted:
              </strong>
              {" " + parseDate(item.created_at)}
            </p>
          : ""}      

            <div className="media-item__buttons media-item__buttons--results">
              <button onClick={() => props.handleSave(item.apiId)} className="btn btn-save">Save <i className="icon icon-bookmark"></i></button>
            </div>

        </div>
      )) : ""}
    </div>
  );
}

export default Results;
import React from "react";
import "./Sidebar.scss";

function Sidebar(props) {
  function displayMetadata(type, creator, genre, platform) {
    if ((type === "book" || type === "music") && creator) {
      return creator;
    } else if ((type === "movie" || type === "show" || type === "game") && genre) {
      return genre;
    } else {
      return ''
    }
  }
  return (
    <div className="col-md-3 sidebar">

      {props.mediaType !== "movie" ? 
      <div>
        <div className="sidebar__title">Active {props.mediaType}s</div>
        <div className="sidebar__media">
          {// Check for media items and check that there is at least 1 active item
          props.items.filter(item => item.active === true && item.type === props.mediaType).length >= 1 ? 
          // Filter for active items in the current type
          props.items.filter(item => item.active === true && item.type === props.mediaType).map(item => (
            <div key={item._id} className="sidebar__media-item sidebar__media-item--active">
              {item.image ? <img src={item.image} alt={item.title} className="sidebar__img" /> : ''}
              <a href={'#' + item.apiId} className="sidebar__link"><strong>{item.title}</strong></a>
              {item.year ? 
                <span className="sidebar__year"> ({item.year})</span>
              : ""}
              <p>{displayMetadata(item.type, item.creator, item.genre, item.platform)}</p>
              <button onClick={() => props.toggleActive(item._id) } className="btn-active">
                <i className="icon icon-eye"><span className="sr-only">Set inactive</span></i>
              </button>
              <div className="clearfix"></div>
            </div>
          )) : <p className="text-center sidebar__message">Active {props.mediaType}{props.mediaType !== "music" ? "s" : "" } will display here</p> }
        </div>
      </div>
      : ""}

      <div className="sidebar__title">Completed {props.mediaType}{props.mediaType !== "music" ? "s" : "" }</div>
      <div className="sidebar__media">
        {// Check for media items and check that there is at least 1 completed item
        props.items.filter(item => item.complete === true && item.type === props.mediaType).length >= 1 ? 
        // Filter for completed items in the current type
        props.items.filter(item => item.complete === true && item.type === props.mediaType).map(item => (
          <div key={item._id} className="sidebar__media-item sidebar__media-item--complete">
            {item.image ? <img src={item.image} alt={item.title} className="sidebar__img" /> : ''}
            <a href={'#' + item.apiId} className="sidebar__link"><strong>{item.title}</strong></a>
            {item.year ? 
              <span className="sidebar__year"> ({item.year})</span>
            : ""}
            <p>{displayMetadata(item.type, item.creator, item.genre,  item.platform)}</p>
            <button onClick={() => props.toggleComplete(item._id) } className="btn-complete">
              <i className="icon icon-check"><span className="sr-only">Set inactive</span></i>
            </button>
            <div className="clearfix"></div>
          </div>
        )) : <p className="text-center sidebar__message">Completed {props.mediaType}{props.mediaType !== "music" ? "s" : "" } will display here</p> }
      </div>

    </div>
  )
}

export default Sidebar;
import React from "react";
import "./Sidebar.scss";

function Sidebar(props) {
  function displayMetadata(type, creator, platform) {
    if ((type === "book" || type === "music") && creator) {
      return creator;
    } else if ((type === "movie" || type === "show" || type === "game") && platform) {
      return `Platform: ${platform}`
    } else {
      return ''
    }
  }
  return (
    <div className="col-md-3 sidebar">
      <div className="sidebar__title">Active Media</div>
      <div className="sidebar__content">
        {// Check for media items and check that there is at least 1 active item
        props.items && props.items.filter(item => item.active === true).length >= 1 ? 
        // Filter for active items in the current type
        props.items.filter(item => item.active === true && item.type === props.mediaType).map(item => (
          <div key={item._id} className="sidebar__media-item">
            {item.image ? <img src={item.image} alt={item.title} className="sidebar__img" /> : ''}
            <a href={'#' + item.apiId} className="sidebar__link"><strong>{item.title}</strong></a>
            <p>{displayMetadata(item.type, item.creator, item.platform)}</p>
            <button onClick={() => props.toggleActive(item._id) } className="btn-active">
              <i className="icon icon-eye"><span className="sr-only">Set inactive</span></i>
            </button>
            <div className="clearfix"></div>
          </div>
        )) : <p className="text-center">Start setting your active media</p> }
      </div>
    </div>
  )
}

export default Sidebar;
import React from "react";
import PostModal from "../PostModal";
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
        <div className="sidebar__title">Active {props.mediaType}{props.mediaType !== "music" ? "s" : ""}</div>
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
              <div className="sidebar__buttons sidebar__buttons--active">
                <button onClick={() => props.toggleActive(item._id) } className="btn-active sidebar-btn">
                  <i className="icon icon-eye"><span className="sr-only">Set inactive</span></i>
                </button>
                <button onMouseUp={() => props.toggleComplete(item._id) } className="btn-complete sidebar-btn">
                  <i className="icon icon-check"><span className="sr-only">Set complete</span></i>
                </button>
              </div>
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
            <p>{displayMetadata(item.type, item.creator, item.genre, item.platform)}</p>
            <div className="sidebar__buttons sidebar__buttons--complete">
              <button onClick={() => props.toggleComplete(item._id) } className="btn-complete sidebar-btn">
                <i className="icon icon-check"><span className="sr-only">Set incomplete</span></i>
              </button>
              <button data-toggle="modal" data-target={"#modal-" + item.apiId} className="btn-recommend sidebar-btn">
                <i className="icon icon-star"><span className="sr-only">Recommend</span></i>
              </button>
            </div>
            <div className="clearfix"></div>
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
        )) : <p className="text-center sidebar__message">Completed {props.mediaType}{props.mediaType !== "music" ? "s" : "" } will display here</p> }
      </div>

    </div>
  )
}

export default Sidebar;
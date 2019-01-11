import React from "react";
import "./Sidebar.scss";

function Sidebar(props) {
  return (
    <div className="col-md-3 sidebar">
      <div className="sidebar__title">Active Media <i className="icon icon-eye"></i></div>
      <div className="sidebar__content">
        {/* Check for media items and check that there is at least 1 active item */}
        {props.items && props.items.filter(item => item.active === true).length >= 1 ? 
        props.items.filter(item => item.active === true).map(item => (
          <div key={item._id} className="sidebar__media-item">
            <img src={item.image} alt={item.title} className="sidebar__img" />
            <a href={'#' + item.apiId} className="sidebar__link"><strong>{item.title}</strong></a>
            {item.creator ? <p>{item.creator}</p> : ''}
            <div className="clearfix"></div>
          </div>
        )) : <p className="text-center">Start setting your active media</p> }
      </div>
    </div>
  )
}

export default Sidebar;
import React from "react";
import PostModal from "../PostModal"
import "./FriendResults.scss";

function Results(props) {
//   function creatorText(type, string) {
//     if (type === "book") {
//       if (string.includes(",")) {
//         return "Authors: "
//       } else {
//         return "Author: "
//       }
//     } else if (type === "music") {
//       if (string.includes(",")) {
//         return "Artists: "
//       } else {
//         return "Artist: "
//       }
//     } else if (type === "movie" || type === "show") {
//       if (string.includes(",")) {
//         return "Directors: "
//       } else {
//         return "Director: "
//       }
//     } else if (type === "game") {
//       if (string.includes(",")) {
//         return "Studios: "
//       } else {
//         return "Studio: "
//       }
//     } else if (type === "friend") {
//       return "Creator: "
//     }
//   }
  return (
    <div>
      {props.items ? props.items.map(item => (
        <div key={item._id} id={item._id} className={'media-item ' + (item.active ? "media-item--active" : item.complete ? 'media-item--complete' : '')}>
          {/* <div className="media-item__header">
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
          </div> */}

          {/* {item.creator ? 
            <p className="media-item__creator">
              <strong>
                {creatorText(item.type, item.creator)}
              </strong>
              {item.creator}
            </p>
          : ""}

          {item.genre ?
            <p className="media-item__genre">
              <strong>Genre: </strong>{item.genre}
            </p>
          : ""} */}

          {item.firstName ?
            <p className="media-item__friend">
              <i className="icon icon-user"> </i><strong>{item.username}</strong> ({item.firstName} {item.lastName})
            </p>
          : ""}
          
          {
          //   props.resultType === "saved" ? 
          //   <div className="media-item__buttons media-item__buttons--saved">
          //     <button onClick={() => props.handleRemoveFriend(item._id) } className="btn btn-unfriend">Unfriend <i className="icon icon-user-times"></i></button>       
          //   </div>
          // : 
          props.resultType === "results" ?
            <div className="media-item__buttons media-item__buttons--results">
              <button onClick={() => props.handleAddFriend(item.apiId)} className="btn btn-add">Add Friend <i className="icon icon-user-plus"></i></button>
            </div>
          : ""}
              
          <PostModal 
            postText={props.postText}
            // handleInputChange={props.handleInputChange}
            // handleRecommend={props.handleRecommend}
            // media={item}
            // image={item.image}
            // title={item.title}
            // creator={item.creator}
            // apiId={item.apiId}
          />

        </div>
      )) : ""}
    </div>
  );
}

export default Results;
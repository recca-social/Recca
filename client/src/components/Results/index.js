import React from "react";
import SearchResult from "./searchResult.js";
import SavedResult from "./savedResult.js";
import "./media-item.scss";

function Results(props) {
  return (
    <div>
      {/* props.items exists, filter for items in the viewed type that are not completed */}
      {props.items ? props.items.filter(item => item.type === props.mediaType && !item.complete).map(item => (
        <div key={item.apiId}>
          {props.resultType === "results" ?
            <SearchResult
              item={item}
              mediaType={props.mediaType}
              typeCheckPluralizer={props.typeCheckPluralizer}
              platformText={props.platformText}
              genreText={props.genreText}
              postText={props.postText}
              handleInputChange={props.handleInputChange}
              handleRecommend={props.handleRecommend}
              handleSave={props.handleSave}
            /> : props.resultType === "saved" ?
            <SavedResult
              item={item}
              mediaType={props.mediaType}
              typeCheckPluralizer={props.typeCheckPluralizer}
              platformText={props.platformText}
              genreText={props.genreText}
              postText={props.postText}
              handleInputChange={props.handleInputChange}
              handleRecommend={props.handleRecommend}
              handleDelete={props.handleDelete}
              toggleActive={props.toggleActive}
              toggleComplete={props.toggleComplete}
            /> : ""
          }
        </div>
      )) : ""}
    </div>
  );
}

export default Results;
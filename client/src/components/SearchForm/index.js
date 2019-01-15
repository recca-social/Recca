import React from "react";
import "./search-form.scss";

function SearchForm(props) {
  return (
    <form>
      <div className="form-group">
        <label className="sr-only" htmlFor="search">Search:</label>
        <input
          onChange={props.handleInputChange}
          value={props.search}
          name="search"
          type="text"
          className="form-control"
          placeholder={"Search " + props.mediaType + (props.mediaType !== "music" ? "s" : "") }
        />
        <button onClick={props.handleSearch} className="btn btn-primary">
          <i className="icon icon-search"></i><span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
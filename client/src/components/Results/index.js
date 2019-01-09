import React from "react";
import "./results.scss";

function Results(props) {
  console.log(props)
  return (
    <div className="results-wrapper">
      {props.results ? props.results.map(result => (
        <div className="result" key={result.apiId}>
          <div className="result__header">
            <img
              alt={result.title} className="result__img"
              src={result.image}
            />
            <div className="result__details">
              <h3 className="result__title">{result.title}</h3>
              <p className="result__description">{result.description}</p>
            </div>
          </div>
          <p className="result__byline">
            {result.type === "book" ? "Author(s): " : ""}<strong>{result.authors}</strong>
          </p>

          <div className="result__buttons">
            <button onClick={() => props.handleBookSave(result.apiId)} className="btn btn-save">Save <i className="icon icon-bookmark"></i></button>
            <a href={result.link} target="_blank" rel="noopener noreferrer" className="btn btn-more">More <i className="icon icon-link-ext"></i></a>
            {/* {props.currentPage === "search" ? 
              <button onClick={() => props.handleBookSave(book.id)} className="btn btn-primary save">Save</button> :
              <button onClick={() => props.handleDelete(book.id)} className="btn btn-danger save">Remove</button>
            } */}
              
          </div>
        </div>
      )) : ""}
    </div>
  );
}

export default Results;
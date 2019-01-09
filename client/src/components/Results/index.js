import React from "react";
import "./results.scss";

function Results(props) {
  return (
    <div>

    </div>

    // <div className="results">
    //   {props.books.map(book => (
    //     <div className="list-group-item result" key={book.id}>
    //       <div className="result__header">
    //         <h3 className="result__title">{book.title}</h3>
    //         <div className="result__buttons">
    //           <a href={book.link} target="_blank" rel="noopener noreferrer" className="btn btn-primary view">View</a>
    //           {props.currentPage === "search" ? 
    //             <button onClick={() => props.handleBookSave(book.id)} className="btn btn-primary save">Save</button> :
    //             <button onClick={() => props.handleDelete(book.id)} className="btn btn-danger save">Remove</button>
    //           }
                
    //         </div>
    //       </div>
    //       <p className="result__byline">
    //         Author(s): <strong>{book.authors}</strong>
    //       </p>
    //       <img
    //         alt={book.title} className="results__img"
    //         src={book.image} />
    //       <p className="results__description">
    //         {book.description}
    //       </p>
    //       <div className="clearfix"></div>
    //     </div>
    //   ))}
    // </div>
  );
}

export default Results;
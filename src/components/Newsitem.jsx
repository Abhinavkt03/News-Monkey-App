import React from "react";

function Newsitem({ title, description, imgUrl, url }) {
  return (
    <div className="card" style={{ width: "22rem", height: "100%" }}>
      <img
        src={imgUrl}
        className="card-img-top"
        alt="..."
        style={{ objectFit: "fill", height: "20rem" }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <a href={url} rel="noreferrer" target="_blank" className="btn btn-dark">
          Read more
        </a>
      </div>
    </div>
  );
}

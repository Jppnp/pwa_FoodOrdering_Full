import React from "react";
import { Spinner } from "react-bootstrap";

const Loading = ({text}) => {
  return (
    <div className="loading-component-overlay">
      <Spinner animation="grow" variant="primary" />
      <div className="loading-component-text">
        Loading...
        <p>{text}</p>
        </div>
    </div>
  );
};

export default Loading;

import React from "react";
import "./style.scss";

const LoadingIcon = props => {
  return (
    <div>
    {props.loading ? 
      <div className="loading">
        <img src="/images/recca-loading.png" alt="Recca loading icon"/>
      </div> : ""}
    </div>
  )
}

export default LoadingIcon;
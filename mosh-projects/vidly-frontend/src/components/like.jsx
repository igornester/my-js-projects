import React, { Component } from "react";

const Like = (props) => {
  return (
    <div>
      <i
        className={"fa fa-heart" + (props.liked ? "" : "-o")}
        aria-hidden="true"
        onClick={props.onLiked}
      ></i>
    </div>
  );
};

export default Like;

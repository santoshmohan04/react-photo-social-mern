import React from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";

interface IProps {
  username: string;
  caption: string;
  imageUrl: string;
}

let Post: React.FC<IProps> = ({ username, caption, imageUrl }) => {
  return (
    <React.Fragment>
      <div className="post">
        <div className="post__header">
          <Avatar
            className="post__avatar"
            alt={username}
            src="/static/images/avatar/1.jpg"
          />
          <h3>{username}</h3>
        </div>
        <img className="post__image" src={imageUrl} alt="React" />{" "}
        <h4 className="post__text">
          <strong>{username}</strong>
          {caption}
        </h4>
      </div>
    </React.Fragment>
  );
};
export default Post;

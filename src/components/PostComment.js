import React from "react";
import { useComments } from "../contexts/CommentProvider";

const PostComment = () => {
  const { sendComments } = useComments();

  const postComment = (e) => {
    e.preventDefault();
    const date = Date().split(" ");
    const id = Math.floor(Math.random() * 99999999) + 1;
    const content = e.target[0].value;
    const createdAt = `${date[1]} ${date[2]}, ${date[3]}`;
    const replies = [];
    const score = 0;
    if (content === "" || content === " ") return;
    const postingComment = {
      id,
      content,
      createdAt,
      score,
      replies,
      user: {
        image: {
          png: "../images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      currentUser: {
        image: {
          png: "../images/avatars/image-juliusomo.png",
          webp: "../images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };
    sendComments(postingComment);
    e.target.reset();
  };

  return (
    <div className="post-comment">
      <form onSubmit={postComment}>
        <textarea placeholder="Add a comment..."></textarea>
        <div className="info-btn">
          <img src={"../images/avatars/image-juliusomo.png"} alt="User Img" />
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default PostComment;

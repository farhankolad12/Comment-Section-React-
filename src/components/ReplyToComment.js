import React, { useState } from "react";
import { useComments } from "../contexts/CommentProvider";

const ReplyToComment = ({ comment }) => {
  const { replyingToComment } = useComments();
  const [closeReply, setCloseReply] = useState(true);

  const replyingComment = (id, e) => {
    e.preventDefault();
    const content = e.target[0].value;
    const cid = Math.floor(Math.random() * 999999) + 1;
    const date = Date().split(" ");
    const createdAt = `${date[1]} ${date[2]}, ${date[3]}`;
    const score = 0;
    const replyingTo = comment.user.username;

    const obj = {
      id: cid,
      content,
      createdAt,
      score,
      replyingTo,
      user: {
        image: {
          png: "../images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
      currentUser: {
        image: {
          png: "./images/avatars/image-juliusomo.png",
          webp: "./images/avatars/image-juliusomo.webp",
        },
        username: "juliusomo",
      },
    };
    replyingToComment(id, obj);
    setCloseReply(false);
  };

  return (
    closeReply && (
      <>
        <div className="post-comment">
          <form onSubmit={(e) => replyingComment(comment.id, e)}>
            <textarea placeholder="Add a comment..."></textarea>
            <div className="info-btn">
              <img src={comment.currentUser.image.png} alt="User Img" />
              <button type="submit">Reply</button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default ReplyToComment;

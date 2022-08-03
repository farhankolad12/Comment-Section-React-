import React from "react";
import UserComment from "./UserComment";
import ReplyComment from "./ReplyComment";

const Comments = ({ comment }) => {
  return (
    <>
      <UserComment key={comment.id} comment={comment} />
      {comment.replies.length !== 0 &&
        comment.replies.map((comment) => {
          return <ReplyComment key={comment.id} comment={comment} />;
        })}
    </>
  );
};

export default Comments;

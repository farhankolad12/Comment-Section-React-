import React, { useState } from "react";
import plus from "../images/icon-plus.svg";
import minus from "../images/icon-minus.svg";
import reply from "../images/icon-reply.svg";
import deleteIcon from "../images/icon-delete.svg";
import editIcon from "../images/icon-edit.svg";
import { useComments } from "../contexts/CommentProvider";
import ReplyToComment from "./ReplyToComment";
import DeleteModal from "./DeleteModal";
import EditComment from "./EditComment";

const ReplyComment = ({ comment }) => {
  const { commentsData, plusVote, minusVote, deleteComment } = useComments();
  const [delId, setDelId] = useState();
  const [replySection, setReplySection] = useState(false);
  const [disableUp, setDisableUp] = useState(false);
  const [disableDown, setDisableDown] = useState(false);
  const [delModal, setDelModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const voteUp = (id) => {
    setDisableUp(true);
    setDisableDown(false);
    plusVote(id);
  };

  const downVote = (id) => {
    setDisableDown(true);
    setDisableUp(false);
    minusVote(id);
  };

  const initiateDel = (id) => {
    setDelModal(true);
    setDelId(id);
  };

  const cancelModal = () => {
    setDelModal(false);
  };

  const delComment = () => {
    deleteComment(delId);
  };

  const openReply = () => {
    return setReplySection(!replySection);
  };

  const initiateEdit = () => {
    return setIsEdit(!isEdit);
  };

  return (
    <>
      <div key={comment.id} className="reply-comment">
        <div className="border"></div>
        <div className="comment">
          <div className="user-info">
            <img src={comment.user.image.png} alt="User Img" />
            <h3>{comment.user.username}</h3>
            {comment.user.username === commentsData[0].currentUser.username && (
              <p>you</p>
            )}
            <span>{comment.createdAt}</span>
          </div>
          {isEdit && <EditComment comment={comment} />}
          <p>
            <span>{`@${comment.replyingTo}`} </span>
            {comment.content}
          </p>
          <div className="action-on-comments">
            <div className="vote">
              <button onClick={() => voteUp(comment.id)} disabled={disableUp}>
                <img src={plus} alt="Plus Icon" />
              </button>
              <span>{comment.score}</span>
              <button
                onClick={() => downVote(comment.id)}
                disabled={disableDown}
              >
                <img src={minus} alt="Minus Icon" />
              </button>
            </div>
            <div className="reply-action">
              {comment.user.username ===
              commentsData[0].currentUser.username ? (
                <>
                  <button onClick={() => initiateDel(comment.id)}>
                    <img src={deleteIcon} alt="Delete Icon" />
                    <span style={{ color: "hsl(358, 79%, 66%)" }}> Delete</span>
                  </button>
                  <button onClick={() => initiateEdit(comment.id)}>
                    <img src={editIcon} alt="Edit Icon" />
                    <span> Edit</span>
                  </button>
                </>
              ) : (
                <button onClick={openReply}>
                  <img src={reply} alt="Reply Icon" />
                  Reply
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {replySection && <ReplyToComment comment={comment} />}
      {delModal && <DeleteModal onDel={delComment} onCancel={cancelModal} />}
    </>
  );
};

export default ReplyComment;

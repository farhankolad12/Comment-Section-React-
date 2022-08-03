import React, { useState } from "react";
import { useComments } from "../contexts/CommentProvider";

const EditComment = ({ comment }) => {
  const [closeUpdate, setCloseUpdate] = useState(true);
  const { editingComment } = useComments();

  const editComment = (e, id) => {
    e.preventDefault();
    const content = e.target[0].value;
    if (content === "") return;
    setCloseUpdate(false);

    editingComment(content, id);
  };

  return (
    closeUpdate && (
      <>
        <div className="post-comment">
          <form onSubmit={(e) => editComment(e, comment.id)}>
            <textarea placeholder="Edit your comment given below is your original comment"></textarea>
            <div className="info-btn">
              <button style={{ marginLeft: "auto" }} type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </>
    )
  );
};

export default EditComment;

import React, { useContext, useState } from "react";
import COMMENTSDATA from "../data.json";

const CommentContext = React.createContext();

export const useComments = () => {
  return useContext(CommentContext);
};

export function CommentProvider({ children }) {
  const [commentsData, setCommentsData] = useState(COMMENTSDATA);

  /* useEffect(() => {
    localStorage.getItem("data") === null && setCommentsData(COMMENTSDATA);

    localStorage.getItem("data") !== null &&
      
      setCommentsData(JSON.parse(localStorage.getItem("data")));
  }, []);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(commentsData));
  }, [commentsData]); */

  const sendComments = (obj) => {
    return setCommentsData([...commentsData, obj]);
  };

  function plusVote(id) {
    commentsData.map((comment) => {
      comment.replies.map((c) => {
        return (
          c.id === id &&
          setCommentsData([...commentsData, (c.score = c.score + 1)])
        );
      });
      return (
        comment.id === id &&
        setCommentsData([...commentsData, (comment.score = comment.score + 1)])
      );
    });
  }

  function minusVote(id) {
    commentsData.map((comment) => {
      comment.replies.map((c) => {
        return (
          c.id === id &&
          setCommentsData([...commentsData, (c.score = c.score - 1)])
        );
      });
      return (
        comment.id === id &&
        setCommentsData([...commentsData, (comment.score = comment.score - 1)])
      );
    });
  }

  const replyingToComment = (id, obj) => {
    commentsData.map((comment) => {
      comment.replies.map((c) => {
        return (
          c.id === id &&
          setCommentsData([...commentsData, comment.replies.push(obj)])
        );
      });
      return (
        comment.id === id &&
        setCommentsData([...commentsData, comment.replies.push(obj)])
      );
    });
  };

  const deleteComment = (id) => {
    const filterReplyComment = commentsData.filter((comment) =>
      comment.replies.filter((c) => {
        return (
          c.id === id && comment.replies.splice(comment.replies.indexOf(c), 1)
        );
      })
    );

    setCommentsData(filterReplyComment);

    return setCommentsData(commentsData.filter((comment) => comment.id !== id));
  };

  const editingComment = (com, cid) => {
    commentsData.map((comment) => {
      comment.replies.map((c) => {
        return (
          c.id === cid && setCommentsData([...commentsData, (c.content = com)])
        );
      });

      return (
        comment.id === cid &&
        setCommentsData([...commentsData, (comment.content = com)])
      );
    });
  };

  const value = {
    commentsData,
    sendComments,
    replyingToComment,
    plusVote,
    minusVote,
    deleteComment,
    editingComment,
  };

  return (
    <CommentContext.Provider value={value}>{children}</CommentContext.Provider>
  );
}

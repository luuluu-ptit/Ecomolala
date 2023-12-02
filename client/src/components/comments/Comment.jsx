import "./comments.scss";
import Comments from "./Comments";
import React, { useState, useEffect } from "react";

export default function Comment({ comment, addReply }) {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleSubmitReply = () => {
    addReply(comment._id, replyText);
    setIsReplying(false);
    setReplyText("");
  };

  return (
    <div>
      <h2>
        <strong>User</strong>: {comment.comment_userName}
      </h2>
      <p>
        <strong>Comment</strong>: {comment.comment_content}
      </p>

      {comment.comment_parentId ? (
        <button onClick={handleReplyClick}>Reply</button>
      ) : null}
      {isReplying ? (
        <form onSubmit={handleSubmitReply}>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : null}
      {comment.children.map((child) => (
        <Comments
          key={comment._id}
          parentCommentId={child._id}
          comment={comment.child}
          addReply={addReply}
        />
      ))}
    </div>
  );
}

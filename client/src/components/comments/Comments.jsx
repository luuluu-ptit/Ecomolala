import "./comments.scss";
import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import transformComments from "./utils";
// import { useParams, useNavigate } from "react-router-dom";

import ApiService from "../../api/index.js";

export default function Comments({ comments, productId, parentCommentId }) {
  // const [comments, setComments] = useState([]);
  // console.log(comments, "comments00");

  // useEffect(() => {
  //   console.log("comments0");
  //   const fetchComments = async () => {
  //     const response = await ApiService.getCommentsByParentComment(
  //       productId,
  //       parentCommentId
  //     );
  //     console.log(response, "comments");
  //     setComments(transformComments(response.data.metadata));
  //   };

  //   fetchComments();
  // }, [parentCommentId]);

  function addReply(parentId, replyText) {
    // const newComment = {
    //   _id: new Date().getTime(),
    //   comment_userName: "User",
    //   comment_content: replyText,
    //   comment_parentId: parentId,
    //   children: [],
    // };
    // const commentsWithNewReply = comments.map((comment) => {
    //   if (comment._id === parentId) {
    //     return { ...comment, children: [...comment.children, newComment] };
    //   } else {
    //     return {
    //       ...comment,
    //       children: comment.children.map((child) =>
    //         addReply(child._id, replyText)
    //       ),
    //     };
    //   }
    // });
    // setComments(commentsWithNewReply);
  }

  return (
    <div>
      {comments?.map((comment) => (
        <Comment
          productId={comment._id}
          comment={comment}
          addReply={addReply}
        />
      ))}
    </div>
  );
}

import { useState, useEffect } from "react";
import * as api from "../api/api";

function PostComment() {
    const [list, setList] = useState([]);
    const [comment, setComment] = useState("");

useEffect(() => {
    // setLoading(true)
      // api.postComment(commentBody).then(({data: {article}}) => {
      //   setSingleArticle(article);
      //   setLoading(false);
      // })
    }, []);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // setList((currList) => {
      //   return [newItem, ...currList];
      // });
      // setNewItem("");
    };
  
    return (
      <>
        <h2>Post your comment..</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <input
              value=""
              // {newItem}
              onChange={(event) => setComment(event.target.value)}
            />
          </label>
          <button type="submit">Post</button>
        </form>
      </>
    );
  }

export default PostComment
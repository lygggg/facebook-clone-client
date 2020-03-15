import AddPost from "../components/posts/AddPost";
import ShowPostHome from "../components/posts/ShowPostHome";
import React from "react";

function TimeLinePost({
  postState,
  setPostState,
  currentUserState,
  commentState,
  setCommentState,
  setTopLevelState,
  loginState,
  setLoginState,
}) {
  const { id, friends } = currentUserState;
  const { post: posts } = postState;
  const appropriatePosts = posts.filter(post => post.id === id || friends.includes(post.id));

  return (
    <div className="timeline-post">
      <AddPost
        currentUserState={currentUserState}
        postState={postState}
        setPostState={setPostState}
      />
      <div>
        {appropriatePosts.map((p, index) => (
          <div key={index}>
            <ShowPostHome
              postState={postState}
              setPostState={setPostState}
              currentUserState={currentUserState}
              commentState={commentState}
              setCommentState={setCommentState}
              setTopLevelState={setTopLevelState}
              specificPost={p}
              index={index}
              loginState={loginState}
              setLoginState={setLoginState}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TimeLinePost;

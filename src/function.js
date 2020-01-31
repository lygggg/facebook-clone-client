export const addPost = (poststate, temptId, temptContents) => {
  const { post } = poststate;

  return {
    ...poststate,
    post: [...post,
      {
        id: temptId,
        contents: temptContents,
        thumbCount: 0,
        sharingCount: 0,
        commentCount: 0,
      },
    ],
  };
};

export const addComment = (commentState, postId, temptStatement) => {
  console.log(`<addPost> id: postId, id=${postId} `);
  const { comment } = commentState;
  return {
    ...commentState,
    comment: [...comment,
      {
        id: postId,
        writer: 'Default Manager',
        statement: temptStatement,
      },
    ],
  };
};

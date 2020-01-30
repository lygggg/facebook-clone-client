export const postUp = (state, id) => {
  const { post } = state;
  return {
    ...state,
    post: post.map((v) => (v.writer !== id ? v : { ...v, thumbCount: v.thumbCount + 1 })),
  };
};

export const commentUp = (state, id) => {
  const { comment } = state;
  return {
    ...state,
    comment: comment.map((v) => (v.id !== id ? v : { ...v, commentThumbCount: v.commentThumbCount + 1 })),
  };
};

import React from 'react';
import {render} from "enzyme";
import Comment from "../../components/comments/Comment";

describe('Comment', () => {
  let currentUserState;
  let postState;
  let setPostState;
  let commentState;
  let setCommentState;
  let loginState;
  let setLoginState;
  let p;

  beforeEach(() => {
    currentUserState = {
      id: 'Random_ID',
      userName: 'Woomin',
    };
    loginState = {
      users: [ { id: 'Random_ID' }]
    };
    commentState = {
      comment: []
    };
    p = {
      time: [2020, 4, 21, 5, 16],
      thumbCount: [],
    };
  });

  it('renders well', () => {
    const component = render(
      <Comment
        specificPost={p}
        setPostState={setPostState}
        postState={postState}
        currentUserState={currentUserState}
        commentState={commentState}
        setCommentState={setCommentState}
        loginState={loginState}
        setLoginState={setLoginState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('.comment-word').text()).toBe('댓글달기');
    expect(component.find('.comment-button').text()).toBe('입력');
  });
});

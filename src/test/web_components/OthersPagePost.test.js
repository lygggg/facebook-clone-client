import OthersPagePost from "../../web_components/OthersPagePost";
import React from "react";
import {render} from 'enzyme';

describe('OthersPagePost', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let postState;
  let setPostState;
  let commentState;
  let setCommentState;
  let specificPost;

  beforeEach(() => {
    postState = { post: [] };
  });

  it('renders well', () => {
    const component = render(
      <OthersPagePost
        postState={postState}
        setPostState={setPostState}
        currentUserState={currentUserState}
        commentState={commentState}
        setCommentState={setCommentState}
        loginState={loginState}
        setLoginState={setLoginState}
        specificPost={specificPost}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toBe('게시글이 없습니다.');
  });
});

import React from 'react';
import {render} from "enzyme";
import ShowPostOthersPage from "../../components/posts/ShowPost";

describe('ShowPostOthersPage', () => {
  let currentUserState;
  let postState;
  let setPostState;
  let commentState;
  let setCommentState;
  let loginState;
  let setLoginState;
  let p;
  let index;

  beforeEach(() => {
    currentUserState = {
      id: 'Random_ID',
      userName: 'Woomin'
    };
    loginState = { users: [] };
    p = {
      uniqueKey: 999,
      name: 'Woomin',
      time: [2020, 4, 21, 5, 16],
      thumbCount: [],
    };
    commentState = { comment: [] };
  });

  it('renders well', () => {
    const component = render(
      <ShowPostOthersPage
        postState={postState}
        setPostState={setPostState}
        currentUserState={currentUserState}
        commentState={commentState}
        setCommentState={setCommentState}
        p={p}
        index={index}
        loginState={loginState}
        setLoginState={setLoginState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.text()).toMatch('좋아요');
    expect(component.text()).toMatch('댓글');
    expect(component.text()).toMatch('스크랩');
    expect(component.text()).toMatch('2020년 4월 21일　5 : 16');
    expect(component.find('.showpost-edit').text()).toBe('수정');
    expect(component.find('.showpost-remove').text()).toBe('삭제');
  });
});

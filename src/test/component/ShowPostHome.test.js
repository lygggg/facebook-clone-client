import React from 'react';
import {render} from "enzyme";
import {BrowserRouter} from "react-router-dom";
import ShowPostHome from "../../components/posts/ShowPostHome";

describe('ShowPostHome', () => {
  let currentUserState;
  let postState;
  let setPostState;
  let commentState;
  let setCommentState;
  let loginState;
  let setLoginState;
  let setTopLevelState;
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
      <BrowserRouter>
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
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.text()).toMatch('게시글을 업로드했습니다.');
    expect(component.text()).toMatch('수정');
    expect(component.text()).toMatch('삭제');
    expect(component.text()).toMatch('좋아요');
    expect(component.text()).toMatch('댓글');
    expect(component.text()).toMatch('스크랩');
  });
});

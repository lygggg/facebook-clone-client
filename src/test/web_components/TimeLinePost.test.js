import React from "react";
import {render} from 'enzyme';
import TimeLinePost from "../../web_components/TimeLinePost";
import {BrowserRouter} from "react-router-dom";

describe('TimeLinePost', () => {
  let loginState;
  let setLoginState;
  let currentUserState;
  let postState;
  let setPostState;
  let commentState;
  let setCommentState;
  let setTopLevelState;

  beforeEach(() => {
    currentUserState = {
      id: 'Random_ID',
      friends: ['Random_ID'],
    };
    commentState = {
      comment: [],
    }
    loginState = {
      users: [
        {
          id: 'Random_ID',
          friends: ['Random_ID'],
        }
      ],
    }
    postState = {
      post: [
        {
          uniqueKey: 999,
          id: 'Random_ID',
          time: [2020, 4, 21, 5, 16],
          thumbCount: [],
        }
      ]
    };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <TimeLinePost
          postState={postState}
          setPostState={setPostState}
          currentUserState={currentUserState}
          commentState={commentState}
          setCommentState={setCommentState}
          setTopLevelState={setTopLevelState}
          loginState={loginState}
          setLoginState={setLoginState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('게시물 만들기');
    expect(component.text()).toMatch('게시글을 업로드했습니다');
    expect(component.text()).toMatch('2020년 4월 21일');
    expect(component.text()).toMatch('수정');
    expect(component.text()).toMatch('삭제');
    expect(component.text()).toMatch('댓글');
  });
});

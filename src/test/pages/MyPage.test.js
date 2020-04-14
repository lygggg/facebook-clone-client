import MyPage from "../../pages/MyPage";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('MyPage', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let commentState;
  let setCommentState;
  let postState;
  let setPostState;
  let setTopLevelState;
  let setSearchState;

  beforeEach(() => {
    currentUserState = {
      id: 'Randome_ID',
      userName: 'Woomin',
      profile: 'path',
    };
    loginState = { users: [] };
    postState = { post: [] };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <MyPage
          postState={postState}
          setPostState={setPostState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          loginState={loginState}
          setLoginState={setLoginState}
          commentState={commentState}
          setCommentState={setCommentState}
          setTopLevelState={setTopLevelState}
          setSearchState={setSearchState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.text()).toMatch('타임라인');
    expect(component.text()).toMatch('정보');
    expect(component.text()).toMatch('친구');
    expect(component.text()).toMatch('스크랩');
  });
});

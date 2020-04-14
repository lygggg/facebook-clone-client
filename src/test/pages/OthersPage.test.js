import OthersPage from "../../pages/OthersPage";
import React from "react";
import {render} from 'enzyme';
import {BrowserRouter} from "react-router-dom";

describe('OthersPage', () => {
  let currentUserState;
  let setCurrentUserState;
  let loginState;
  let setLoginState;
  let commentState;
  let setCommentState;
  let postState;
  let setPostState;
  let topLevelState;
  let setSearchState;

  beforeEach(() => {
    loginState = {
      users: [
        {
          id: 'Random_ID'
        }
      ]
    };
    topLevelState = { id: 'Random_ID' };
    currentUserState = {
      id: 'Random_ID_2',
      friends: ['Random_ID_3'],
    };
    postState = { post: [] };
  });

  it('renders well', () => {
    const component = render(
      <BrowserRouter>
        <OthersPage
          specificPost={topLevelState}
          loginState={loginState}
          setLoginState={setLoginState}
          currentUserState={currentUserState}
          setCurrentUserState={setCurrentUserState}
          postState={postState}
          setPostState={setPostState}
          commentState={commentState}
          setCommentState={setCommentState}
          setSearchState={setSearchState}
        />
      </BrowserRouter>
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('타임라인');
    expect(component.text()).toMatch('정보');
    expect(component.text()).toMatch('친구');
    expect(component.text()).toMatch('팔로우');
  });
});

import React from "react";
import {shallow} from 'enzyme';
import TimeLinePost from "../../web_components/TimeLinePost";

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
    postState = {
      post: [
        {
          id: 'Random_ID'
        }
      ]
    };
  });

  it('renders well', () => {
    const component = shallow(
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
    );

    expect(component).toMatchSnapshot();
  });
});

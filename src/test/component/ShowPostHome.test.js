import React from 'react';
import {shallow} from "enzyme";
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

  it('renders well', () => {
    const component = shallow(
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
  });
});

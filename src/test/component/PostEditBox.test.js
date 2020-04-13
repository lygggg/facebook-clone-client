import React from 'react';
import {shallow} from "enzyme";
import PostEditBox from "../../components/posts/PostEditBox";

describe('PostEditBox', () => {
  let specificPost;
  let postState;
  let setPostState;
  let currentUserState;

  beforeEach(() => {
    currentUserState = { id: 'Random ID' }
  });

  it('renders well', () => {
    const component = shallow(
      <PostEditBox
        specificPost={specificPost}
        postState={postState}
        setPostState={setPostState}
        currentUserState={currentUserState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.find('button').text()).toBe('완료');
    expect(component.find('textarea')).toBeDefined();
  });
});

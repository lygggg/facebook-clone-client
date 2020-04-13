import React from 'react';
import {shallow} from "enzyme";
import AddPost from "../../components/posts/AddPost";

describe('AddPost', () => {
  let currentUserState;
  let postState;
  let setPostState;

  beforeEach(() => {
    currentUserState = { userName: 'Woomin' };
  });

  it('renders well', () => {
    const component = shallow(
      <AddPost
        currentUserState={currentUserState}
        postState={postState}
        setPostState={setPostState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.find('button').text()).toBe('게시');
    expect(component.find('form').text()).toBeDefined();
  });
});

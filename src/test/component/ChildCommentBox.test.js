import React from 'react';
import {shallow} from "enzyme";
import ChildCommentBox from "../../components/comments/ChildCommentBox";

describe('ChildCommentBox', () => {
  let commentState;
  let setCommentState;
  let currentUserState;
  let p;

  beforeEach(() => {
    currentUserState = {
      id: 'Random_ID',
      userName: 'Woomin'
    };
    p = {
      uniqueKey: 999,
    }
  });

  it('renders well', () => {
    const component = shallow(
      <ChildCommentBox
        commentState={commentState}
        setCommentState={setCommentState}
        parentsComment={p}
        currentUserState={currentUserState}
      />
    );

    expect(component).toMatchSnapshot();
    expect(component.text()).toMatch('Woomin');
    expect(component.find('button').text()).toBe('입력');
  });
});

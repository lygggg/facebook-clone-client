import React, { useState } from 'react';
import {addPost, fileUpload} from '../../function';

function AddPost({
  currentUserState,
  postState,
  setPostState,
}) {
  const [temptState, setTemptState] = useState('');
  const [file, setFile] = useState('');
  const [imagePath, setImagePath] = useState('');
  const { userName, id, profile } = currentUserState;

  const setPostTemptContents = (temptState) => {
    setTemptState(temptState);
  };

  const handleAddPost = async () => {
    if (temptState.trim()) {
      const { timeLinePosts } = await addPost(id, userName, temptState, profile, imagePath);

      setPostState({ ...postState, post: [...timeLinePosts] });
      setTemptState('');
    } else {
      alert('내용을 입력해주세요');
    }

    setImagePath('');
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const { filePath } = await fileUpload(formData);
    setImagePath(filePath);
  };

  return (
    <div className="addpost">
      <div className="addpost-title">게시물 만들기</div>
      <div className="addpost-notion">
        <img style={{ width: '10%' }} src={profile} alt="" />
        <span className="addpost-span">
          {userName}
        </span>
        님, 무슨 생각을 하고 계신가요?
      </div>
      <div className="addpost-notion">생각을 게시글로 표현 해주세요</div>
      <input className="addpost-inputcontents" type="text" value={temptState} onChange={(e) => setPostTemptContents(e.target.value)} />
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
          <input type="submit" value="선택" />
        </div>
        {imagePath ? (
          <div>
            <div>
              <img style={{ width: '50%' }} src={imagePath} alt="" />
            </div>
          </div>
        ) : null}
      </form>
      <button className="addpost-out" type="submit" onClick={handleAddPost}>게시</button>
    </div>
  );
}

export default AddPost;

import React, { useState } from 'react';
import func from '../../function';

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
      const time = func.getCurrentTime();
      const { timeLinePosts } = await func.addPost(id, userName, temptState, profile, imagePath, time);

      setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
      setTemptState('');
    } else {
      alert('내용을 입력해주세요');
    }

    setImagePath('');
  };

  const onChange = async (e) => {
    await setFile(e.target.files[0]);
    const send = document.getElementById('send');

    send.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('woomin-facebook', file);
    const { filePath } = await func.fileUpload(formData);
    setImagePath(filePath.url);
  };

  return (
    <div className="addpost">
      <div className="addpost-title">게시물 만들기</div>
      <div className="addpost-notion">
        <img className="profile-image" src={profile} alt="" />
        <span className="addpost-whatdoyouthink">
          {userName}
          님, 무슨 생각을 하고 계신가요?
        </span>
      </div>
      <div className="addpost-expressthinking">생각을 게시글로 표현 해주세요</div>
      <textarea className="addpost-textarea" type="text" value={temptState} onChange={(e) => setPostTemptContents(e.target.value)} />
      <form enctype="multipart/form-data" onSubmit={onSubmit}>
        <div>
          <label className="fileupload">
            <i className="far fa-image"></i>
            <input className="hidden" type="file" name="woomin-facebook" onChange={onChange} />
            <input className="hidden" value="" id="send" type="submit" />
          </label>
        </div>
        {imagePath ? (
          <div>
            <div>
              <img className="addpost-upload-image" src={imagePath} alt="" />
            </div>
          </div>
        ) : null}
      </form>
      <button className="addpost-submit" type="submit" onClick={handleAddPost}>게시</button>
    </div>
  );
}

export default AddPost;

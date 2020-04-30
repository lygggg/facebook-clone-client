import React, { useState } from 'react';
import func from '../../function';
import Swal from "sweetalert2";

function AddPost({
  currentUserState,
  postState,
  setPostState,
}) {
  const [userWriting, setUserWriting] = useState('');
  const [file, setFile] = useState('');
  const [imagePath, setImagePath] = useState('');
  const { userName, id, profile } = currentUserState;

  const saveUserWriting = (userWriting) => {
    setUserWriting(userWriting);
  };

  const addPostButtonClicked = async () => {
    if (userWriting.trim()) {
      const time = func.getCurrentTime();
      const { timeLinePosts } = await func.addPost(id, userName, userWriting, profile, imagePath, time);

      setPostState({ ...postState, post: [...timeLinePosts.reverse()] });
      setUserWriting('');
    } else {
      await Swal.fire('', '내용을 입력해주세요', 'error');
    }

    setImagePath('');
  };

  const fileInput = async (e) => {
    await setFile(e.target.files[0]);
    const send = document.getElementById('send');

    send.click();
  };

  const sendFile = async (e) => {
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
      <textarea
        className="addpost-textarea"
        value={userWriting}
        onChange={(e) => saveUserWriting(e.target.value)} />
      <form onSubmit={sendFile}>
        <div>
          <label className="fileupload">
            <i className="far fa-image"/>
            <input className="hidden" type="file" name="woomin-facebook" onChange={fileInput} />
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
      <button className="addpost-submit" type="submit" onClick={addPostButtonClicked}>게시</button>
    </div>
  );
}

export default AddPost;

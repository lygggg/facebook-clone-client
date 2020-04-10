import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import func from '../function';

function JoinProfileImage({
  currentUserState,
  setCurrentUserState,
}) {
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const history = useHistory();

  const { id } = currentUserState;

  const onChange = async (e) => {
    await setFile(e.target.files[0]);
    const send = document.getElementById('send');
    send.click();
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    const { fileName, filePath } = await func.fileUpload(formData);
    await func.addProfileImage(id, filePath);

    setCurrentUserState({
      ...currentUserState,
      profileImage: filePath,
    });
    setUploadedFile({ fileName, filePath });
  };

  const moveNextPage = () => {
    history.push('/joinfollow');
  };


  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input type="file" onChange={onChange} />
          <input className="hidden" value="" id="send" type="submit" />
        </div>
        {uploadedFile ? (
          <div>
            <div>
              <img style={{ width: '100%' }} src={uploadedFile.filePath} alt="" />
            </div>
          </div>
        ) : null}
      </form>
      <button onClick={moveNextPage}>
        다음
      </button>
    </>
  );
}

export default JoinProfileImage;

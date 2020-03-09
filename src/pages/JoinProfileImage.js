import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { addProfileImage, fileUpload } from '../function';

function JoinProfileImage({
  currentUserState,
  setCurrentUserState,
}) {
  const [file, setFile] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const [moveNext, setMoveNext] = useState(false);

  const { id } = currentUserState;
  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    const { fileName, filePath } = await fileUpload(formData);
    await addProfileImage(id, filePath);

    setCurrentUserState({
      ...currentUserState,
      profileImage: filePath,
    });
    setUploadedFile({ fileName, filePath });
  };

  const moveNextPage = () => {
    setMoveNext(true);
  };

  if (moveNext === true) {
    return <Redirect to='joinfollow' />;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="file"
            onChange={onChange}
          />
          <br />
          <input
            type="submit"
            value="선택하기"
          />
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

import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from "sweetalert2";
import func from "../../function";

Modal.setAppElement('body');

function ModalBox({
  specificPost,
  postState,
  setPostState,
  currentUserState,
}) {
  const [open, setOpen] = useState(false);
  const [updatedContents, setUpdatedContents] = useState('');
  const { id } = currentUserState;

  const openModalBox = async () => {
    if (specificPost.id !== id) {
      await Swal.fire('', '게시글은 해당 작성자만 수정 할 수 있습니다', 'error');
      return;
    }

    setOpen(true);
  };

  const closeModalBox = () => {
    setOpen(false);
  };

  const handleUserWrite = (write) => {
    setUpdatedContents(write);
  };

  const updatePost = async () => {
    const { uniqueKey } = specificPost;

    if (!updatedContents.trim()) {
      await Swal.fire('', '수정사항을 입력해주세요', 'error');
      return;
    }

    const { timeLinePosts } = await func.editPost(uniqueKey, updatedContents);
    setPostState({ ...postState, post: [...timeLinePosts.reverse()] });

    setUpdatedContents('');
    setOpen(false);
    await Swal.fire('', '게시글이 수정되었습니다', 'success');
  };

  const removePost = async () => {
    const { timeLinePosts } = await func.removePost(specificPost.uniqueKey);
    setPostState({ ...postState, post: [...timeLinePosts.reverse()] });

    setOpen(false);
    await Swal.fire('', '게시글이 삭제되었습니다', 'success');
  }

  return (
    <div>
      <button className="modal-open" onClick={openModalBox}>
        ...
      </button>
      <Modal
        isOpen={open}
        contentLabel="CRUD"
        className="modal"
      >
        <label className="modal-top">
          <div className="modal-text">게시글 설정하기</div>
          <i className="far fa-window-close" onClick={closeModalBox} />
        </label>
        <div className="modal-main">
          <img className="modal-profile-image" src={specificPost.profile} alt="" width="7%" />
          <div className="modal-balloon">◄</div>
          <textarea placeholder="수정 사항을 입력해주세요..." className="modal-textarea" onChange={e => handleUserWrite(e.target.value)} />
        </div>
        <button className="modal-update-button" onClick={updatePost}>업데이트</button>
        <button className="modal-remove-button" onClick={removePost}>게시글 삭제</button>
      </Modal>
    </div>
  );
}

export default ModalBox;

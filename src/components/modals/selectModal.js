import React, { useState } from 'react';
import Modal from 'react-modal';
import Swal from "sweetalert2";
import func from "../../function";
import ModalBox from "./modal";

Modal.setAppElement('body');

function SelectModal({
  specificPost,
  postState,
  setPostState,
  currentUserState
}) {
  const [open, setOpen] = useState(false);
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
        <ModalBox
          specificPost={specificPost}
          postState={postState}
          setPostState={setPostState}
          currentUserState={currentUserState}
        />
        <button className="modal-remove-button" onClick={removePost}>게시글 삭제</button>
        <button className="modal-close-button" onClick={closeModalBox}>닫기</button>
      </Modal>
    </div>
  );
}

export default SelectModal;

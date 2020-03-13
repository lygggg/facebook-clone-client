import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../../function';
import logo from '../../facebooklogo.png';

const callAPI = async (loginState, setLoginState) => {
  const { userStore } = await getUsers();

  setLoginState({ ...loginState, user: [...userStore] });
};

function SearchBox({
  loginState,
  setLoginState,
  setSearchState,
}) {
  const [userWriting, setUserWriting] = useState('');
  const history = useHistory();
  const { users } = loginState;

  useEffect(() => {
    callAPI(loginState, setLoginState);
  }, []);

  const getUserWriting = (writing) => {
    setUserWriting(writing);
  };

  const searchButtonClicked = () => {
    const searchedNames = users.filter((v) => v.userName === userWriting);

    if (searchedNames.length !== 0) {
      setSearchState({ contents: [...searchedNames], exist: true });
    }
    history.push('/search');
  };

  const moveToPostPage = () => {
    history.push('/post');
  };

  return (
    <div className="search-box">
      <img className="logo" src={logo} onClick={moveToPostPage} />
      <input
        className="search-input"
        type="text"
        onChange={(e) => getUserWriting(e.target.value)}
        placeholder="검색"
      />
      <i className="fas fa-search" onClick={searchButtonClicked}></i>
    </div>
  );
}

export default SearchBox;

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import func from '../../function';
import logo from '../../files/facebooklogo.png';

const getUserDataFromServer = async (loginState, setLoginState) => {
  const { userStore } = await func.getUsers();

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
    getUserDataFromServer(loginState, setLoginState);
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

  const searchEnterPressed = async (key) => {
    if (key === 'Enter') {
      await searchButtonClicked();
    }
  }

  const moveToPostPage = () => {
    history.push('/post');
  };

  return (
    <div className="search-box">
      <img className="logo" src={logo} onClick={moveToPostPage} alt="" />
      <input
        className="search-input"
        type="text"
        onChange={(e) => getUserWriting(e.target.value)}
        placeholder="　검색"
        onKeyPress={(e) => searchEnterPressed(e.key)}
      />
      <i className="fas fa-search" onClick={searchButtonClicked} />
    </div>
  );
}

export default SearchBox;

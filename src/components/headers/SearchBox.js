import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getUsers } from '../../function';

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

  return (
    <>
      <span>검색</span>
      <input type="text" role="combobox" onChange={(e) => getUserWriting(e.target.value)} />
      <button type="button" onClick={searchButtonClicked}>찾기</button>
      <br />
    </>
  );
}

export default SearchBox;

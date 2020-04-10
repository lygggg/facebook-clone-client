import React, { useEffect } from 'react';
import func from '../function';
import Header from '../web_components/Header';
import SearchContents from '../web_components/SearchContents';

const callAPI = async (currentUserState, setCurrentUserState) => {
  const { user } = await func.checkSessionExist();

  setCurrentUserState({
    ...currentUserState,
    id: user.id,
    userName: user.userName,
    friends: user.friends,
    profile: user.profile,
  });
};

function Search({
  searchState,
  setSearchState,
  topLevelState,
  setTopLevelState,
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
}) {
  useEffect(() => {
    callAPI(currentUserState, setCurrentUserState);
  }, []);

  return (
    <>
      <Header
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
        setSearchState={setSearchState}
      />
      <br />
      <SearchContents
        searchState={searchState}
        setSearchState={setSearchState}
        topLevelState={topLevelState}
        setTopLevelState={setTopLevelState}
        loginState={loginState}
      />
    </>
  );
}

export default Search;

import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import HeaderOthersPage from '../components/headers/HeaderOthersPage';
import SearchBox from '../components/headers/SearchBox';
import { checkSessionExist } from '../function';

const callAPI = async (currentUserState, setCurrentUserState) => {
  const { user } = await checkSessionExist();

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
  const { users } = loginState;

  useEffect(() => {
    callAPI(currentUserState, setCurrentUserState);
  }, []);

  const findUserById = (id) => {
    for (let i = 0; i < users.length; i += 1) {
      if (id === users[i].id) {
        setTopLevelState({
          ...topLevelState,
          id: users[i].id,
          name: users[i].userName,
        });
      }
    }
    setSearchState({ ...setSearchState, contents: [], exist: false });
  };

  return (
    <>
      <SearchBox
        loginState={loginState}
        setLoginState={setLoginState}
        setSearchState={setSearchState}
      />
      <HeaderOthersPage
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
      <br />
      <br />
      {searchState.exist
        ? (
          searchState.contents.map((v, index) => (
          <div key={index}>
            <img style={{ width: '16%' }} src={v.profile} alt="" />
            <Link
              to="/otherspage"
              className="post-name"
              type="button"
              onClick={() => findUserById(v.id)}
            >
              {v.userName}
            </Link> <br />
            <span>{v.location}</span> <br />
          </div>)))
        : (<span>해당 유저가 존재하지 않습니다</span>)}
    </>
  );
}

export default Search;

import { Link } from 'react-router-dom';
import React from 'react';

function SearchContents({
  searchState,
  setSearchState,
  topLevelState,
  setTopLevelState,
  loginState,
}) {
  const { users } = loginState;

  const setUserToTopLevelByID = (id) => {
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
    <div className="join-following">
      {searchState.exist
        ? (
          searchState.contents.map((v, index) => (
            <div key={index}>
              <label className="join-users">
                <img className="join-user-profile" src={v.profile} alt="" />
                <div className="join-users-informatrion">
                  <Link
                    to="/otherspage"
                    className="join-users-name"
                    type="button"
                    onClick={() => setUserToTopLevelByID(v.id)}
                  >
                    {v.userName}
                  </Link>
                  <div className="join-users-lint">{v.birth}</div>
                  <div className="join-users-lint">{v.location}</div>
                  <div className="join-users-lint">{v.email}</div>
                </div>
              </label>
            </div>
          )))
        : (<span>해당 유저가 존재하지 않습니다</span>)}
    </div>
  );
}

export default SearchContents;

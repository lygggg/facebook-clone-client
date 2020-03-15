import SearchBox from "../components/headers/SearchBox";
import HeaderHome from "../components/headers/HeaderHome";
import React from "react";

function Header({
  loginState,
  setLoginState,
  currentUserState,
  setCurrentUserState,
  setSearchState,
}) {
  return (
    <div className="header">
      <SearchBox
        loginState={loginState}
        setLoginState={setLoginState}
        setSearchState={setSearchState}
      />
      <HeaderHome
        loginState={loginState}
        setLoginState={setLoginState}
        currentUserState={currentUserState}
        setCurrentUserState={setCurrentUserState}
      />
    </div>
  );
}

export default Header;

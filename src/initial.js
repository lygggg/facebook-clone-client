const initial = {
  currentUser: {
    id: '',
    pw: '',
    userName: '',
    friends: [],
  },

  login: {
    users: [],
    isLoggedIn: false,
  },

  post: {
    post: [],
    scrap: [],
  },

  comment: {
    comment: [],
  },

  search: {
    contents: [],
    exist: false,
  }
}

export default initial;

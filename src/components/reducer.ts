const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_POSTS':
      return {
        ...state,
        posts: action.payload
      };
    case 'ADD_POST':
      return {
        ...state,
        posts: state.posts.concat(action.payload)
      };
    case 'REMOVE_POST':
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload)
      };
    case 'USER_LOGGED_IN':
      return [{
        ...state,
        userData: action.payload
      }];
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
};

export default Reducer;
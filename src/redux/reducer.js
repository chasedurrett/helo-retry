const initialState = {
  username: "",
  id: "",
  profile_pic: "https://robohash.org/fgh",
};

const USER_INFO_TO_DUX = "USER_INFO_TO_DUX";

export function userInfoToDux(username, id, profile_pic) {
  return {
    type: USER_INFO_TO_DUX,
    payload: { username, id, profile_pic },
  };
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case USER_INFO_TO_DUX:
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

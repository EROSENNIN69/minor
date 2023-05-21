import { loginStart, loginFailed, loginSuccess } from "./userSlice";
import { publicRequest } from "../request";

export const signUp = async (dispatch, fd) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/register", fd, {
      headers: {
        'Content-Type': 'multipart/form-data',
      }
    });
    dispatch(loginSuccess(res?.data));
  } catch (e) {
    dispatch(loginFailed());
  }
};

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/signin", user);
    dispatch(loginSuccess(res.data));
  } catch (e) {
    dispatch(loginFailed());
  }
}
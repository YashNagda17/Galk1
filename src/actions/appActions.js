import * as actionType from "./types";

export const setApplicationModule = (appModule) => (dispatch) => {
  dispatch({
    type: actionType.SET_APPLIACTION_MODULE,
    payload: appModule,
  });
};

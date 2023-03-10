import * as actionTypes from "../actions/types";
import { ApplicationModule } from "../utils/models/applicationModules";

const initialState = {
  isLoading: false,
  appModule: ApplicationModule.Default,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.APP_MODULE_LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    case actionTypes.SET_APPLIACTION_MODULE:
      return {
        ...state,
        appModule: action.payload,
      };
    default:
      return state;
  }
}

import * as actionTypes from "../actions/types";

const initialState = {
    individualChatList: null,
    groupChatList: null,
    selectedChatId: null,
    selectedChatMessages: null,
    isChatListLoading: false,
    isMessageLoading: false,
    companyMetaData: null,
    studentMetaData: null,
    isFileUploading: false,
    fileUploadProgress: 0,
};
const chatRoomGalkLabReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes._START_CHAT_LIST_LOADING:
            return {
                ...state,
                isChatListLoading: true,
            };
        case actionTypes._STOP_CHAT_LIST_LOADING:
            return {
                ...state,
                isChatListLoading: false,
            };
        case actionTypes._GET_AVAILABLE_CHAT_LISTS:
            return {
                ...state,
                groupChatList: action.payload.groupChatList,
                individualChatList: action.payload.individualChatList,
            };
        case actionTypes._GET_COMPANY_METADATA:
            return {
                ...state,
                companyMetaData: action.payload,
            };
        case actionTypes._GET_STUDENT_METADATA:
            return {
                ...state,
                studentMetaData: action.payload,
            };
        case actionTypes._SET_SELECTED_CHAT:
            return {
                ...state,
                selectedChatId: action.payload,
                // selectedChatMessages: [
                //   ...state.individualChatList,
                //   ...state.groupChatList,
                // ].find((chat) => chat.chatId === action.payload).messages,
            };
        case actionTypes._CLEAR_CHAT_ROOM_DATA:
            return {
                ...state,
                selectedChatId: null,
                individualChatList: null,
                groupChatList: null,
            };
        case actionTypes._SET_CHAT_FILEUPLOAD_LOADING:
            return {
                ...state,
                isFileUploading: action.payload,
            };
        case actionTypes._SET_CHAT_FILEUPLOAD_PROGRESS:
            return {
                ...state,
                fileUploadProgress: action.payload,
            };
        default:
            return state;
    }
};

export default chatRoomGalkLabReducer;

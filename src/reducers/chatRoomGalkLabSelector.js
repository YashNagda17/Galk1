export const getChatActiveStatus = (state) => {
    const selectedChatId = state.chatRoomGalkLab.selectedChatId;
    const individualChatList = state.chatRoomGalkLab.individualChatList || [];
    const groupChatList = state.chatRoomGalkLab.groupChatList || [];
    const allChatList = [...individualChatList, ...groupChatList];

    if (selectedChatId) {
        const selectedChat = allChatList.find(
            (chat) => chat.chatId === selectedChatId
        );
        if (selectedChat) {
            return selectedChat.active;
        }
    }

    return false;
};

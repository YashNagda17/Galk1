export const getChatActiveStatus = (state) => {
  const selectedChatId = state.chatRoom.selectedChatId;
  const individualChatList = state.chatRoom.individualChatList || [];
  const groupChatList = state.chatRoom.groupChatList || [];
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

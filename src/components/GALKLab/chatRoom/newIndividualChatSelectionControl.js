import React, { useEffect, useState } from "react";
import { List, Avatar, Button, Tooltip } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const getChatList = (
  studentMetaData,
  individualChatList,
  taggedStudentList
) => {
  const studentsAlreadyInChat = individualChatList.map(
    (chat) => chat.participants[0]
  );
  if (!taggedStudentList)
    taggedStudentList = []
  const allStudentsForChat = [...taggedStudentList];

  const taggedStudentsRemainToChat = allStudentsForChat.filter((stu) => {
    if (studentsAlreadyInChat.includes(stu)) {
      return false;
    }
    return true;
  });

  let chatList = null;
  chatList = studentMetaData.filter((data) => {
    if (taggedStudentsRemainToChat.includes(data.id)) {
      return true;
    }
    return false;
  });

  return chatList;
};

const NewIndividualChatSelectionControl = ({
  studentMetaData,
  taggedStudentList,
  individualChatList,
  startChatHandler,
}) => {
  const remainingStudentListToChat = getChatList(
    studentMetaData,
    individualChatList,
    taggedStudentList
  );
  const [loading, setLoading] = useState(true)
  const startChat = (id) => {
    if (id) {
      startChatHandler(id, null, "individual");
    }
  };
  useEffect(() => {
    setTimeout(() => setLoading(false), 100)
  }, [])
  return (
    <React.Fragment>
      {
        remainingStudentListToChat && (
          // remainingStudentListToChat.map((student, i) => (
          <div style={{
            width: 480, height: 500,
            overflow: 'auto',
            paddingRight: '30px'
          }}>
            {loading ?
              <List loading={loading} itemLayout="horizontal" />
              :
              <List
                itemLayout="horizontal"
                dataSource={remainingStudentListToChat}
                loading={loading}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <Tooltip title="Click to initiate conversation">
                        <Button
                          type="primary"
                          shape="circle"
                          icon={<MessageOutlined />}
                          onClick={() => startChat(item.id)}
                        />
                      </Tooltip>,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.img} />}
                      title={item.name}
                      description={`${item.collegeName}, ${item.branchName}`}
                    />
                  </List.Item>
                )}
              />
            }
          </div>
        )
        // ))
      }
    </React.Fragment>
  );
};

export default NewIndividualChatSelectionControl;

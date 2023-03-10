import React, { useState } from "react";
import { List, Avatar, Button, Tag, Select, Space, Form, Input } from "antd";

export const getChatList = (studentMetaData, taggedStudentList) => {
  const allStudentsForChat = [...taggedStudentList];

  let chatList = null;
  chatList = studentMetaData.filter((data) => {
    if (allStudentsForChat.includes(data.id)) {
      return true;
    }
    return false;
  });

  return chatList;
};

export const renderStudentTag = (props) => {
  const { label, closable, onClose } = props;

  return (
    <Tag
      color="default"
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {`${label.props.title},${label.props.description.split(",")[0]}`}
    </Tag>
  );
};

const NewGroupChatSelectionControl = ({
  studentMetaData,
  taggedStudentList,
  startChatHandler,
}) => {
  const [selectedStudentList, setSelectedStudentList] = useState([]);
  const [errSelectedStudentList, setErrSelectedStudentList] = useState({
    status: "",
    msg: "",
  });
  const [chatName, setChatName] = useState("");
  const [errChatName, setErrChatName] = useState({
    status: "",
    msg: "",
  });

  const availableStudentListToChat = getChatList(
    studentMetaData,
    taggedStudentList
  );

  const startChat = (e) => {
    e.preventDefault();
    setErrSelectedStudentList({
      status: "",
      msg: "",
    });
    setErrChatName({
      status: "",
      msg: "",
    });

    if (selectedStudentList.length < 1) {
      setErrSelectedStudentList({
        status: "error",
        msg: "Select atleast one student to create group",
      });
    }
    if (!chatName) {
      setErrChatName({
        status: "error",
        msg: "Please enter a group name",
      });
    }

    if (selectedStudentList.length > 0 && chatName) {
      startChatHandler(selectedStudentList, chatName, "group");
    }
  };

  const handleStudentSelect = (updatedSelectedList) => {
    if (updatedSelectedList.length > 0 && errSelectedStudentList.status) {
      setErrSelectedStudentList({
        status: "",
        msg: "",
      });
    }
    setSelectedStudentList(updatedSelectedList);
  };

  const handleGroupNameInput = (e) => {
    const value = e.target.value;
    if (value && errChatName.status) {
      setErrChatName({
        status: "",
        msg: "",
      });
    }
    setChatName(value);
  };

  return (
    <React.Fragment>
      <Form layout="vertical">
        <Form.Item
          style={{ marginBottom: 0 }}
          label="Add students"
          validateStatus={errSelectedStudentList.status}
          help={errSelectedStudentList.msg}
        >
          <Select
            mode="multiple"
            showArrow
            placeholder="Type student name to add.."
            value={selectedStudentList}
            onChange={handleStudentSelect}
            tagRender={renderStudentTag}
          >
            {availableStudentListToChat.map((item) => (
              <Select.Option key={item.id} value={item.id}>
                <List.Item.Meta
                  avatar={<Avatar src={item.img} />}
                  title={item.name}
                  description={`${item.collegeName}, ${item.branchName}`}
                />
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          style={{ marginBottom: 0 }}
          label="Group name"
          validateStatus={errChatName.status}
          help={errChatName.msg}
        >
          <Input
            placeholder="Group nme"
            onChange={handleGroupNameInput}
            value={chatName}
          />
        </Form.Item>
      </Form>
      <Button type="primary" block onClick={startChat}>
        Create group
      </Button>
    </React.Fragment>
  );
};

export default NewGroupChatSelectionControl;

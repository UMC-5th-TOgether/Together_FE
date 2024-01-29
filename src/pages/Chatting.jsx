import React from "react";
import "../index.css";
import ChattingBox from "../components/Chat/ChattingBox";
import ChattingList from "../components/Chat/ChattingList";

const Chatting = () => {
  return (
    <>
      <ChattingList />
      <ChattingBox />
    </>
  );
};

export default Chatting;

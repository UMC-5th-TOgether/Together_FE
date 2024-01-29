import React from "react";
import "../../style/ChattingBoxStyle.css"; // Ensure this path matches the location of your CSS file

const ChattingBox = () => {
  return (
    <div className="chattingBox">
      <div className="messageContainer">
        <div className="textBadge">
          <div className="text">2024.03.28</div>
        </div>
        {/* ... other elements ... */}
        <div className="userIcon">
          {/* User icon background and other elements */}
        </div>
        {/* Example of a message bubble */}
        <div className="messageBubble">
          <div className="messageText">안녕하세요 :)</div>
        </div>
        {/* Example of a timestamp */}
        <div className="timestamp">15:43</div>
        {/* Repeat similar structure for other messages, user icons, and timestamps */}
        {/* ... */}
        {/* Example of the last message bubble */}
        <div className="messageBubble">
          <div className="messageText">12시 어떠세요?</div>
        </div>
        <div className="timestamp">19:38</div>
        {/* Date separator */}
        <div className="textBadge">
          <div className="text">2024.03.29</div>
        </div>
        {/* User icon for the new day */}
        <div className="userIcon">
          {/* User icon background and other elements */}
        </div>
        {/* Message for the new day */}
        <div className="messageBubble">
          <div className="messageText">
            앗 그 시간에 제가 알바가 있어서 1시간만 늦게 만날 수 있을까요..?!
          </div>
        </div>
        <div className="timestamp">12:11</div>
      </div>
      {/* Send button container */}
      <div className="sendButtonContainer">
        <div className="sendButton">
          <div className="sendText">전송</div>
        </div>
      </div>
    </div>
  );
};

export default ChattingBox;

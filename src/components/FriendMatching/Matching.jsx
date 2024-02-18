import React from "react";
import usersData from "../../data/UserProfileData.json";
import "../../style/MatchingStyle.css";
import MailImg from "../../assets/mail icon.png";
import defaultAvatar from "../../assets/프로필.png";

export default function Matching() {
  const { image, nickname, introduction, gender, age } = usersData[0];

  return (
    <div className="matching-container">
      <div className="matching-contents">
        <div>
          <img
            src={MailImg}
            alt="mail-icon"
            style={{ width: "36px", height: "36px", marginTop: "15px" }}
          />
          <span
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginLeft: "16px",
            }}
          >
            뉴진스 팬미팅 동행 신청합니다!
          </span>
          <span className="matching-read">읽음</span>
        </div>
        <div className="matching-profile">
          <img
            src={image || defaultAvatar}
            alt={`Profile of ${nickname}`}
            className="matching-avatar"
          />
          <div className="matching-detail">
            <p className="matching-nickname">
              {nickname} ({gender}/{age})
            </p>
            <p className="write-time"> {introduction}</p>
          </div>
        </div>
        <div className="matching-comment">
          뉴진스 팬미팅 동행 모집글 보고 연락 드립니다.
          <br /> 저는 민지를 제일 좋아해요~ 공연 후에 뒷풀이도 가면 좋을 것
          같아요 ^^.
          <br /> 프로필 보고 편하게 연락 주세요. ^^
        </div>
        <div
          className="matching-btn"
          onClick={() => {
            console.log("click!");
          }}
        >
          <span onClick={() => {}}>매칭 수락</span> <span>→</span>
        </div>
      </div>
    </div>
  );
}

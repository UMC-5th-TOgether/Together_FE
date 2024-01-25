import React from "react";
import FriendMatchingImg from "../../assets/Friend - Matching.png";
import pngwing from "../../assets/pngwing 2.png";
import "./FriendMatching.css";

export default function FriendMatching() {
  return (
    <div className="friend-matching-container">
      <img src={FriendMatchingImg} alt="headerimg" />
      <div className="matching-comment">
        뉴진스 팬미팅 동행 신청합니다!
        <button className="matching-btn">매칭 수락</button>
      </div>
      <div className="profile-container">
        <img src={pngwing} alt="emoji" />
        <span>닉네임</span>
        <div>여자/22</div>
      </div>
      <div className="matching-comment2">
        <p>뉴진스 팬미팅 동행 신청합니다!</p>
        <hr></hr>
      </div>
      <div className="matching-comment2">
        뉴진스 팬미팅 동행 모집글 보고 연락드립니다. <br />
        저는 민지를 제일 좋아해요~
        <br />
        공연 후에 뒷풀이도 가면 좋을 것 같아요 ^^.
        <br /> 프로필 보고 편하게 연락 주세요
        <br />
      </div>
      <button className="image-container">이미지</button>
    </div>
  );
}

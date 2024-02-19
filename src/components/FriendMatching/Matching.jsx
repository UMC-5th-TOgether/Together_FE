import React, { useEffect, useState } from "react";
import { dummy } from "../../data/MatchingDetailDummy";
import "../../style/MatchingStyle.css";
import MailImg from "../../assets/mail icon.png";
import defaultAvatar from "../../assets/프로필.png";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

export default function Matching() {
  const token = localStorage.getItem("token");
  const [MatchingData, setMatchingData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const matchingInfo = location.state.user;
  const matchingId = matchingInfo.matchingId;

  //매칭 더미데이터
  const DummyMatching = dummy.matching;
  const Writers = dummy.writer;

  useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        const res = await axios.get(
          `https://hyeonjo.shop/api/matching/detail/${matchingId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log(res.data);

        if (res.data.isSuccess) {
          console.log(res.data.data);
          const data = res.data.data;
          setMatchingData(data.matching);
        }
      } catch (error) {
        console.error("Error fetching matching data:", error);
      }
    };

    fetchMatchingData();
  }, []);

  return (
    <div className="matching-container">
      <div className="matching-contents">
        <div>
          <img
            src={MailImg}
            alt="mail-icon"
            style={{
              width: "36px",
              height: "36px",
              marginTop: "15px",
            }}
          />
          <span
            style={{
              fontSize: "36px",
              fontWeight: "bold",
              marginLeft: "16px",
            }}
          >
            {DummyMatching.title}
          </span>
          <span className="matching-read">
            {DummyMatching.isRead ? "읽음" : "읽지 않음"}
          </span>
        </div>
        <div className="matching-profile">
          <img
            src={Writers.profileImage || defaultAvatar}
            alt={`Profile of ${Writers.nickname}`}
            className="matching-avatar"
          />
          <div className="matching-detail">
            <p className="matching-nickname">
              {Writers.nickname} (
              {Writers.gender === "FEMALE" ? "여성" : "남성"}/{Writers.age})
            </p>
            <p className="write-time"> {DummyMatching.sendDate}</p>
          </div>
        </div>
        <div className="matching-comment">{DummyMatching.content}</div>
        <div
          className="matching-btn"
          onClick={() => {
            navigate("/follower");
          }}
        >
          <span>매칭 수락</span> <span>→</span>
        </div>
      </div>
    </div>
  );
}

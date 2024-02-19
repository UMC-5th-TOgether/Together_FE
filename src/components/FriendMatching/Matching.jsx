import React, { useEffect, useState } from "react";
import { dummy } from "../../data/MatchingDetailDummy";
import "../../style/MatchingStyle.css";
import MailImg from "../../assets/mail icon.png";
import defaultAvatar from "../../assets/프로필.png";
import matchingBtn from "../../assets/매칭수락 버튼_Default.png";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Matching() {
  const token = localStorage.getItem("token");
  const [MatchingData, setMatchingData] = useState(null);
  const [Writers, setWriters] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { matchingInfo } = location.state;
  const matchingId = matchingInfo ? matchingInfo.matchingId : null;

  const formatTime = (datetimeString) => {
    if (!datetimeString) return '';
    const updateYear = datetimeString.slice(0, 4);
    const updateMonth = datetimeString.slice(5, 7);
    const updateDate = datetimeString.slice(8, 10);
    const updateTime = datetimeString.slice(11, 16);

    const timeString = updateYear + '.' + updateMonth + '.' + updateDate + ' ' + updateTime;

    return timeString;
  };

  useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        if (matchingId) {
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
            setWriters(data.writer);
          }
        }
      } catch (error) {
        console.error("Error fetching matching data:", error);
      }
    };

    fetchMatchingData();
  }, [matchingId, token]);

  if (!MatchingData || !Writers) {
    return null;
  }

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
            {MatchingData.title}
          </span>
          <span className="matching-read">
            {MatchingData.isRead ? "읽음" : "읽지 않음"}
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
            <p className="write-time"> {formatTime(MatchingData.sendDate)}</p>
          </div>
        </div>
        <div className="matching-comment">{MatchingData.content}</div>
        <div
          className="matching-btn"
          onClick={() => {
            navigate("/follower");
          }}
        >
          <Link><img src={matchingBtn}></img></Link>
        </div>
      </div>
    </div>
  );
}

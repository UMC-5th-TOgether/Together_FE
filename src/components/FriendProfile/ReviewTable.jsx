import React from "react";
import usersData from "../../data/UserProfileData.json";
import "../../style/ReviewTableStyle.css";
import AfterMatching from "../../assets/매칭완료.png";
import BeforeMatching from "../../assets/매칭전.png";

const ReviewTable = () => {
  const userData = usersData[0];

  return (
    <div className="review-table">
      <div className="review-column">
        <div className="review-column-heading">작성한 글</div>
        {userData.posts.map((post, index) => (
          <p key={index} className="review-text">
            {post}
          </p>
        ))}
      </div>
      <div className="review-column">
        <div className="review-column-heading">작성한 댓글</div>
        {userData.comments.map((comment, index) => (
          <p key={index} className="review-text">
            {comment}
          </p>
        ))}
      </div>
      <div className="review-column">
        <div className="review-column-heading">후기</div>
        {userData.reviews.map((reviews, index) => (
          <p className="review-text" key={index}>
            {reviews}
          </p>
        ))}
      </div>
    </div>
  );
};

export default ReviewTable;

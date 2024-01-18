import React from "react";
import usersData from "../../data/UserProfileData.json";
import "../../style/ReviewTableStyle.css";

const ReviewTable = () => {
  const userData = usersData[0];

  return (
    <div className="review-table">
      <div className="review-column-heading">작성한 글</div>
      <div className="review-column-heading">작성한 댓글</div>
      <div className="review-column-heading">후기</div>
      <div className="review-column-heading">매너별점</div>

      <div className="review-column">
        {userData.posts.map((post, index) => (
          <p key={index} className="review-text">
            {post}
          </p>
        ))}
      </div>
      <div className="review-column">
        {userData.comments.map((comment, index) => (
          <p key={index} className="review-text">
            {comment}
          </p>
        ))}
      </div>
      <div className="review-column">
        {userData.reviews.map((review, index) => (
          <p key={index} className="review-text">
            {review}
          </p>
        ))}
      </div>
      <div className="review-rating-column">
        <p className="review-rating">{"★".repeat(userData.manners)}</p>
      </div>
    </div>
  );
};

export default ReviewTable;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import profilePicture from "../assets/프로필.png";
import BannerImage from "../assets/friend-Profile.png";
import { FaStar } from "react-icons/fa";
import "../style/FriendStyle.css";
import { dummy } from "../MemberDummy";
import { PostStatus } from "../components/PostStatus";
import axios from "axios";

export default function FriendProfile() {
  const { residence, review } = dummy.results[0];
  const location = useLocation();
  const friendInfo = location.state.user;
  const friendId = friendInfo.friendId;

  // friendInfo -> friendProfile로 모두 변경해야함.
  const [friendProfile, setFrindProfile] = useState(null);

  const token = localStorage.getItem("token");

  const ARRAY = [0, 1, 2, 3, 4];
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);
  const [friendPost, setfriendPost] = useState(null);
  const [friendComment, setfriendComment] = useState(null);
  const [friendReview, setfriendReview] = useState(null);

  useEffect(() => {
    const fetchFriendProfile = async () => {
      try {
        const res = await axios.get(
          `https://hyeonjo.shop/api/friends/${friendId}/info`,
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
          setFrindProfile(data.memberInfo);
        }
      } catch (error) {
        console.error("Error fetching friendProfile info:", error);
      }
    };

    fetchFriendProfile();
  }, []);

  useEffect(() => {
    const fetchfriendPost = async () => {
      try {
        const res = await axios.get(
          `https://hyeonjo.shopapi/friends/${friendId}/post`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(res.data);
        if (res.data.isSuccess) {
          // console.log(res.data.data);
          const data = res.data.data;
          setfriendPost(data.posts);
          //console.log(friendPost);
        }
      } catch (error) {
        console.log("Error fetching friend Post", error);
      }
    };
    fetchfriendPost();
  }, []);

  useEffect(() => {
    const fetchfriendComment = async () => {
      try {
        const res = await axios.get(
          `https://hyeonjo.shop/api/friends/${friendId}/comment`,
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
          setfriendComment(data.comments);
          console.log(friendComment);
        }
      } catch (error) {
        console.log("Error fetching friend Comment", error);
      }
    };
    fetchfriendComment();
  }, []);

  useEffect(() => {
    const fetchfriendReview = async () => {
      try {
        const res = await axios.get(
          `https://hyeonjo.shop/api/friends/${friendId}/review`,
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
          setfriendReview(data.reviews);
          console.log(friendReview);
        }
      } catch (error) {
        console.log("Error fetching friend Review", error);
      }
    };
    fetchfriendReview();
  }, []);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  //dummy.writtenPosts -> friendPost로 변경
  const currentPosts = dummy.writtenPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );

  //dummy.writtenComments -> friendComment로 변경
  const currentComments = dummy.writtenComments;
  console.log(currentComments);
  //dummy.writtenReviews -> friendReview로 변경
  const currentReviews = dummy.writtenReviews;

  return (
    <div className="my-page">
      <div className="banner-image-container">
        <img className="banner-image" src={BannerImage} alt="Posting img" />
      </div>
      <div className="friend-profile-container">
        <div className="mypage-profile-wrap">
          <img
            className="mypage-profile-picture"
            src={profilePicture}
            alt="Profile"
          />
          <div className="mypage-profile">
            <span className="frined-profile-nickname">
              {friendInfo.nickname} (
              {friendInfo.gender === "FEMALE" ? "여성" : "남성"} /{" "}
              {friendInfo.age})
            </span>
            <div className="frined-profile-residence">{residence}</div>
            <span className="friend-profile-introduction">
              "{friendInfo.profileMessage}"
            </span>
          </div>
        </div>

        <div className="friend-profile-detail">
          <div className="mypage-review-wrap">
            <div className="friend-profile-review-content">
              <span className="friend-profile-detail-font1">동행 횟수</span>
              <span className="mypage-review-content1">
                {review.num_of_people}명 중 {review.num_of_people}명의 이용자가
                다시 만나고 싶어해요.
              </span>
            </div>
            <div className="friend-profile-review-content">
              <span className="friend-profile-detail-font1">매너 별점</span>
              <span className="mypage-review-content2">
                {ARRAY.map((el, index) => (
                  <FaStar
                    key={index}
                    size="14"
                    color={index < review.review_scores ? "#007bff" : "#e4e5e9"}
                  />
                ))}
              </span>
            </div>
            <div className="friend-profile-review-content">
              <span className="friend-profile-detail-font1">응답률</span>{" "}
              <span className="mypage-review-content3">
                {review.response_rate}%
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mypage-wrap">
        <div className="mypage-post">
          <div className="mypage-wrap">
            <div className="mypage-title"> 작성한 글</div>
            <ReactPaginate
              previousLabel={<div className="pagination-label">{"<"}</div>}
              nextLabel={<div className="pagination-label">{">"}</div>}
              breakLabel={<div className="pagination-label">...</div>}
              pageCount={Math.ceil(dummy.writtenPosts.length / postsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              subContainerClassName={"pages pagination"}
              activeClassName={"active"}
              pageLinkClassName={"pagination-link"}
            />
          </div>

          {currentPosts.map((post, index) => (
            <div key={index}>
              <div className="mypage-wrap">
                <div className="mypage-writtenpost">{post.title}</div>
                <div className="mypage-writtenpost-status">
                  <PostStatus status={post.status} />{" "}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mypage-post">
          <div className="mypage-wrap">
            <div className="mypage-title"> 작성한 댓글</div>
          </div>
          {currentComments.map((comment, index) => (
            <div key={index}>
              <div className="mypage-wrap">
                <div className="mypage-writtenpost">{comment.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mypage-post">
          <div className="mypage-wrap">
            <div className="mypage-title"> 작성한 후기</div>
          </div>
          {currentReviews.map((review, index) => (
            <div key={index}>
              <div className="mypage-wrap">
                <div className="mypage-writtenpost">{review.title}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

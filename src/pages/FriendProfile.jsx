import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ReactPaginate from "react-paginate";
import profilePicture from "../assets/프로필.png";
import BannerImage from "../assets/friend-Profile.png";
import { FaStar } from "react-icons/fa";
import "../style/FriendStyle.css";
import { dummy } from '../MemberDummy';
import { PostStatus } from "../components/PostStatus";
import axios from "axios";
import GArrowL from '../assets/arrow-left-gray.png';
import GArrowR from '../assets/arrow-right-gray.png';
import WArrowL from '../assets/arrow-left-white.png';
import WArrowR from '../assets/arrow-right-white.png';

export default function FriendProfile() {
  const { nickname, gender, age, residence, review, introduction } =
    dummy.results[0];
  const location = useLocation();
  const { friendId } = location.state || {};
  // console.log(friendInfo)
  // const friendId = friendInfo ? friendInfo.friendId : null;

  // friendInfo -> friendProfile로 모두 변경해야함.
  const [friendProfile, setFrindProfile] = useState(null);

  const token = localStorage.getItem("token");

  const [myPost, setMyPost] = useState([]);
  const [myPostCurrentPage, setMyPostCurrentPage] = useState(0);
  const [myPostFullPage, setMyPostFullPage] = useState(0)
  const [isMyPostLast, setIsMyPostLast] = useState(false);

  const [myComment, setMyComment] = useState([]);
  const [myCommentCurrentPage, setMyCommentCurrentPage] = useState(0);
  const [myCommentFullPage, setMyCommentFullPage] = useState(0)
  const [isMyCommentLast, setIsMyCommentLast] = useState(false);

  const [myReview, setMyReview] = useState([]);
  const [myReviewCurrentPage, setMyReviewCurrentPage] = useState(0);
  const [myReviewFullPage, setMyReviewFullPage] = useState(0)
  const [isMyReviewLast, setIsMyReviewLast] = useState(false);

  const [postData, setPostData] = useState(null);

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

  const fetchMy = async (element) => {
    if (element === 'post') {
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/post?page=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyPost(data.posts);
          setMyPostCurrentPage(data.pageNo);
          setMyPostFullPage(data.lastPage);
          setIsMyPostLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (element === 'comment') {
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/comment?page=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyComment(data.comments);
          setMyCommentCurrentPage(data.pageNo);
          setMyCommentFullPage(data.lastPage);
          setIsMyCommentLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (element === 'review') {
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/review?page=0`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyReview(data.reviews);
          setMyReviewCurrentPage(data.pageNo);
          setMyReviewFullPage(data.lastPage);
          setIsMyReviewLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  const fetchPrevious = async (element) => {
    if (element === 'post') {
      if (myPostCurrentPage === 0) return;
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/post?page=${myPostCurrentPage - 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyPost(data.posts);
          setMyPostCurrentPage(data.pageNo);
          setMyPostFullPage(data.lastPage);
          setIsMyPostLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (element === 'comment') {
      if (myCommentCurrentPage === 0) return;
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/comment?page=${myCommentCurrentPage - 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyComment(data.comments);
          setMyCommentCurrentPage(data.pageNo);
          setMyCommentFullPage(data.lastPage);
          setIsMyCommentLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (element === 'review') {
      if (myReviewCurrentPage === 0) return;
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/review?page=${myReviewCurrentPage - 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyReview(data.reviews);
          setMyReviewCurrentPage(data.pageNo);
          setMyReviewFullPage(data.lastPage);
          setIsMyReviewLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  const fetchNext = async (element) => {
    if (element === 'post') {
      if (isMyPostLast) return;
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/post?page=${myPostCurrentPage + 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyPost(data.posts);
          setMyPostCurrentPage(data.pageNo);
          setMyPostFullPage(data.lastPage);
          setIsMyPostLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (element === 'comment') {
      if (isMyCommentLast) return;
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/comment?page=${myCommentCurrentPage + 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyComment(data.comments);
          setMyCommentCurrentPage(data.pageNo);
          setMyCommentFullPage(data.lastPage);
          setIsMyCommentLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    } else if (element === 'review') {
      if (isMyReviewLast) return;
      await axios.get(`https://hyeonjo.shop/api/friends/${friendId}/review?page=${myReviewCurrentPage + 1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then(res => {
          if (res.data.isSuccess) {
            return res.data.data;
          }
        })
        .then(data => {
          setMyReview(data.reviews);
          setMyReviewCurrentPage(data.pageNo);
          setMyReviewFullPage(data.lastPage);
          setIsMyReviewLast(data.last);
        })
        .catch(err => {
          console.log(err);
        })
    }

  }

  const navigate2Post = async (postId) => {
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    console.log(postId)
    try {
      const res = await axios.get(`https://hyeonjo.shop/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setPostData(res.data.data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  }


  const ARRAY = [0, 1, 2, 3, 4];
  const postsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = dummy.writtenPosts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const currentComments = dummy.writtenComments;
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
          {friendProfile && (
            <div className="mypage-profile">
              <span className="frined-profile-nickname">
                {friendProfile.nickname} (
                {friendProfile.gender === "FEMALE" ? "여성" : "남성"} / {friendProfile.age})
              </span>
              <div className="frined-profile-residence">{friendProfile.residence}</div>
              <span className="friend-profile-introduction">
                {friendProfile.profileMessage ? `${friendProfile.profileMessage}` : '프로필 메세지가 없습니다'}
              </span>
            </div>
          )}
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
          <div className="mypage-top-container">
            <div className="mypage-title"> 작성한 글</div>
            {myPostFullPage === -1
              ? <></>
              : <div className='myPage-post-pagination-container'>
                <button onClick={() => fetchPrevious('post')} className={myPostCurrentPage === 0 ? 'previousLabel_first' : 'previousLabel'}>
                  <img className="pagination-icon" src={myPostCurrentPage === 0 ? GArrowL : WArrowL} alt="previous" />
                </button>
                <span>{`${myPostCurrentPage + 1} / ${myPostFullPage + 1}`}</span>
                <button onClick={() => fetchNext('post')} className={isMyPostLast ? 'nextLabel_last' : 'nextLabel'}>
                  <img className="pagination-icon" src={isMyPostLast ? GArrowR : WArrowR} alt="next" />
                </button>
              </div>
            }
          </div>
          {myPostFullPage === -1
            ? <span className="element-blank">작성한 포스트가 없습니다.</span>
            : <>{myPost.map((post, index) => (
              <div key={index}>
                <div className="mypage-wrap click" onClick={() => navigate2Post(post.postId)}>
                  <div className="mypage-writtenpost">{post.title}</div>
                  <div className="mypage-writtenpost-status">
                    <PostStatus status={post.status} />{" "}
                  </div>
                </div>
              </div>
            ))}
            </>
          }

        </div>

        <div className="mypage-post">
          <div className="mypage-top-container">
            <div className="mypage-title"> 작성한 댓글</div>
            {myCommentFullPage === -1
              ? <></>
              : <div className='myPage-post-pagination-container'>
                <button onClick={() => fetchPrevious('comment')} className={myCommentCurrentPage === 0 ? 'previousLabel_first' : 'previousLabel'}>
                  <img className="pagination-icon" src={myCommentCurrentPage === 0 ? GArrowL : WArrowL} alt="previous" />
                </button>
                <span>{`${myCommentCurrentPage + 1} / ${myCommentFullPage + 1}`}</span>
                <button onClick={() => fetchNext('comment')} className={isMyCommentLast ? 'nextLabel_last' : 'nextLabel'}>
                  <img className="pagination-icon" src={isMyCommentLast ? GArrowR : WArrowR} alt="next" />
                </button>
              </div>
            }
          </div>
          {myCommentFullPage === -1
            ? <span className="element-blank">작성한 댓글이 없습니다.</span>
            : <>{myComment.map((comment, index) => (
              <div key={index}>
                <div className="mypage-wrap click" onClick={() => navigate2Post(comment.postId)}>
                  <div className="mypage-writtenpost">{comment.content}</div>
                </div>
              </div>
            ))}
            </>
          }

        </div>

        <div className="mypage-post">
          <div className="mypage-top-container">
            <div className="mypage-title"> 작성한 후기</div>
            {myReviewFullPage === -1
              ? <></>
              : <div className='myPage-post-pagination-container'>
                <button onClick={() => fetchPrevious('review')} className={myPostCurrentPage === 0 ? 'previousLabel_first' : 'previousLabel'}>
                  <img className="pagination-icon" src={myPostCurrentPage === 0 ? GArrowL : WArrowL} alt="previous" />
                </button>
                <span>{`${myPostCurrentPage} / ${myPostFullPage}`}</span>
                <button onClick={() => fetchNext('review')} className={isMyPostLast ? 'nextLabel_last' : 'nextLabel'}>
                  <img className="pagination-icon" src={isMyPostLast ? GArrowR : WArrowR} alt="next" />
                </button>
              </div>
            }
          </div>
          {myReviewFullPage === -1
            ? <span className="element-blank">아직 후기가 없습니다.</span>
            : <>
              {myReview.map((review, index) => (
                <div key={index}>
                  <div className="mypage-wrap">
                    <div className="mypage-writtenpost">{review.title}</div>
                  </div>
                </div>
              ))}
            </>
          }
        </div>
      </div>
    </div>
  );
}

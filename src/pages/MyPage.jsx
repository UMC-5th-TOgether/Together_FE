import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import matchingSend from '../assets/my-page.png';
import profilePicture from '../assets/profile.png';
import { FaStar } from 'react-icons/fa';
import '../style/MyPage.css';
import { dummy } from '../MemberDummy';
import { PostStatus } from '../components/PostStatus';

export default function MyPage() {
    const { nickname, gender, age, residence, review } = dummy.results[0];
    const ARRAY = [0, 1, 2, 3, 4];
    const postsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dummy.writtenPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="my-page">
            <div className="banner-image-container">
                <img className="banner-image" src={matchingSend} alt="Posting img" />
            </div>

            <div className="mypage-profile-wrap">
                <img className="mypage-profile-picture" src={profilePicture} alt="Profile" />
                <div className="mypage-profile">
                    <span className="mypage-nickname">{nickname} ({gender} / {age})</span>
                </div>
                <div className="mypage-residence">{residence}</div>
            </div>

            <div className="mypage-wrap">
                <div className="mypage-review-wrap">
                    <span className="mypage-review-content">
                        매너 별점
                    </span>
                    <span className="mypage-review-content">
                        {ARRAY.map((el, index) => (
                            <FaStar
                                key={index}
                                size="14"
                                color={index < review.review_scores ? "#007bff" : "#e4e5e9"}
                            />
                        ))}

                    </span>
                    <span className="mypage-review-content">
                        {review.num_of_people}명 중 {review.num_of_people}명의 이용자가 다시 만나고 싶어해요.
                    </span>
                    <span className="mypage-review-content">
                        응답률 {review.response_rate}%
                    </span>
                </div>
            </div>

            <div className="mypage-wrap">
                <div className="mypage-post">
                    <div className="mypage-wrap">

                        <div className="mypage-title"> 작성한 글</div>
                        <ReactPaginate
                            previousLabel={
                                <div className="pagination-label">
                                    {'<'}
                                </div>
                            }
                            nextLabel={
                                <div className="pagination-label">
                                    {'>'}
                                </div>
                            }
                            breakLabel={<div className="pagination-label">...</div>}
                            pageCount={Math.ceil(dummy.writtenPosts.length / postsPerPage)}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={5}
                            onPageChange={handlePageClick}
                            containerClassName={'pagination'}
                            subContainerClassName={'pages pagination'}
                            activeClassName={'active'}
                            pageLinkClassName={'pagination-link'}
                        />

                    </div>

                    {currentPosts.map((post, index) => (
                        <div key={index}>
                            <div className="mypage-wrap">
                                <div className="mypage-writtenpost">{post.title}</div>
                                <div className="mypage-writtenpost-status"><PostStatus status={post.status} /> </div>
                            </div>
                        </div>
                    ))}

                </div>

                <div className="mypage-post">
                    <div className="mypage-title"> 작성한 댓글</div>
                    {/* {currentComments.map((comment, index) => (
                        <div key={index}>
                            <div className="mypage-wrap">
                                {comment.title}
                            </div>
                        </div>
                    ))} */}
                </div>


                <div className="mypage-post">
                    <div className="mypage-title"> 작성한 후기</div>

                </div>
            </div>
        </div>
    );
}

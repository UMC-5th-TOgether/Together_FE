import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import matchingSend from '../assets/my-page.png';
import profilePicture from '../assets/profile.png';
import { FaStar } from 'react-icons/fa';
import '../style/MyPage.css';
import { dummy } from '../MemberDummy';

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
        <div className="page">
            <div className="banner-container">
                <img className="banner" src={matchingSend} alt="Posting img" />
            </div>

            <div className="profile-wrap">
                <img className="profile-picture" src={profilePicture} alt="Profile" />
                <div className="profile">
                    <span className="nickname">{nickname} ({gender} / {age})</span>
                </div>
                <div className="residence">{residence}</div>
            </div>

            <div className="wrap">
                <div className="review-wrap">
                    <span className="review-content">
                        매너 별점
                    </span>
                    <span className="review-content">
                        {ARRAY.map((el, index) => (
                            <FaStar
                                key={index}
                                size="14"
                                color={index < review.review_scores ? "#007bff" : "#e4e5e9"}
                            />
                        ))}

                    </span>
                    <span className="review-content">
                        {review.num_of_people}명 중 {review.num_of_people}명의 이용자가 다시 만나고 싶어해요.
                    </span>
                    <span className="review-content">
                        응답률 {review.response_rate}%
                    </span>
                </div>
            </div>

            <div className="wrap">
                <div className="home-post">

                    <div className="wrap">

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
                            <div className="wrap">
                                {post.title} {post.content}
                            </div>
                        </div>
                    ))}

                </div>

                <div className="home-post">
                    <div className="mypage-title"> 작성한 댓글</div>

                </div>

                <div className="home-post">
                    <div className="mypage-title"> 작성한 후기</div>

                </div>
            </div>
        </div>
    );
}

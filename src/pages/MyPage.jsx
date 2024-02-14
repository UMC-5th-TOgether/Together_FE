import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import matchingSend from '../assets/my-page.png';
import profilePicture from '../assets/profile.png';
import { FaStar } from 'react-icons/fa';
import '../style/MyPage.css';
import { dummy } from '../MemberDummy';
import { PostStatus } from '../components/PostStatus';
import axios from 'axios';

export default function MyPage() {
    const token = localStorage.getItem('token');
    const [myInfo, setMyInfo] = useState(null);
    // const { nickname, gender, age, residence, review } = dummy.results[0];
    const ARRAY = [0, 1, 2, 3, 4];
    const postsPerPage = 5;
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const fetchMyInfo = async () => {

            try {
                const res = await axios.get('https://hyeonjo.shop/api/myPage/myInfo',
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    });

                console.log(res.data);

                if (res.data.isSuccess) {
                    console.log(res.data.data)
                    const data = res.data.data;
                    setMyInfo(data.memberInfo);
                }
            } catch (error) {
                console.error('Error fetching my info:', error);
            }
        };

        fetchMyInfo();
    }, []);

    const handlePageClick = (data) => {
        const selectedPage = data.selected;
        setCurrentPage(selectedPage);
    };

    const review = {
        reviewAll: 8,
        reviewEmotionYes: 7,
        avgScore: 4,
        responseRate: 99.5
    };

    const writtenPosts = [];

    const indexOfLastPost = (currentPage + 1) * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = dummy.writtenPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <div className="my-page">
            <div className="banner-image-container">
                <img className="banner-image" src={matchingSend} alt="Posting img" />
            </div>

            {myInfo && (
                <div className="mypage-profile-wrap">
                    <img className="mypage-profile-picture" src={profilePicture} alt="Profile" />
                    <div className="mypage-profile">
                        <span className="mypage-nickname">{myInfo.nickname} ({myInfo.gender === 'FEMALE' ? '여성' : '남성'} / {myInfo.age})</span>
                    </div>
                    <div className="mypage-residence">{myInfo.station}</div>
                </div>
            )}


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
                                color={index < review.avgScore ? "#007bff" : "#e4e5e9"}
                            />
                        ))}

                    </span>
                    <span className="mypage-review-content">
                        {review.reviewAll}명 중 {review.reviewEmotionYes}명의 이용자가 다시 만나고 싶어해요.
                    </span>
                    <span className="mypage-review-content">
                        응답률 {review.responseRate}%
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

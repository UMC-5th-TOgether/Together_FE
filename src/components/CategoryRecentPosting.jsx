import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';
import { FaQuoteRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

const CategoryRecentPosting = ({ selectedCategory }) => {
  const token = localStorage.getItem('token');
  const [postData, setPostData] = useState(null);
  const [postList, setPostList] = useState([]);
  const [postsPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(0);

  const navigate = useNavigate();

  const iconStyle = {
    display: 'flex',
    alignItems: 'flex-start',
  };
  const iconStyle2 = {
    display: 'flex',
    alignItems: 'flex-end',
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://hyeonjo.shop/api/posts?category=${selectedCategory}&sortBy=recent&page=${currentPage}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });
        console.log(res.data);
        if (res.data.isSuccess) {
          const reversedPostList = res.data.data.posts;

          const modifiedPostList = reversedPostList.map(post => {
            if (post.gender === 'NONE') {
              post.gender = '제한 없음';
            } else if (post.gender === 'FEMALE') {
              post.gender = '여성';
            } else if (post.gender === 'MALE') {
              post.gender = '남성';
            }
            return post;
          });

          setPostList(modifiedPostList);
        } else {
          console.error('Failed to fetch posts:', res.data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (selectedCategory) {
      fetchPosts();
    }
  }, [selectedCategory]);

  const handleClick = async (postId) => {
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
      console.log(res.data.data);
      setPostData(res.data.data);
    } catch (error) {
      console.error('Error fetching post data:', error);
    }
  };

  useEffect(() => {
    if (postData !== null) {
      navigate(`/postuser/${postData.id}`, { state: { postData } });
    }
  }, [postData, navigate]);

  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postList.slice(indexOfFirstPost, indexOfLastPost);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

  return (
    <div className="category-page-posting">
      {/* <ReactPaginate
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
                pageCount={Math.ceil(postList.length / postsPerPage)}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                pageLinkClassName={'pagination-link'}
            /> */}
      <div className="category-container">
        {currentPosts.map(({ postId, title, writerNickname, accompaniedDate, personNumMin, personNumMax, gender, hashtagList }, index) => (
          <div key={postId} className="home-post" onClick={() => handleClick(postId)}>
            <br />
            <div className="home-post-title">
              <span style={iconStyle}>
                <FaQuoteLeft id="quote-icon" />
              </span>
              <div className="home-post-title-label">{title}</div>
              <span style={iconStyle2}>
                <FaQuoteRight id="quote-icon" />
              </span>
            </div>
            <br />
            <br />

            <div className="home-post-content">
              <div className="js-content-wrap">
                동행자
                <span className="js-content"> {writerNickname}</span>
              </div>
              <div className="js-content-wrap">
                일자
                <span className="js-content"> {accompaniedDate}</span>
              </div>
              <div className="js-content-wrap">
                모집
                <span className="js-content"> {personNumMin}명 ~ {personNumMax}명</span>
              </div>
              <div>
                성별
                <span className="js-content"> {gender}</span>
              </div>
            </div>
            <div className="home-post-hashtag">
              {hashtagList.map((tag, tagIndex) => (
                <div key={tagIndex} className="hashtag">
                  #{tag}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryRecentPosting;

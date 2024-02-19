import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';
import { FaQuoteRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CategoryPosting = ({ selectedCategory }) => {
  const token = localStorage.getItem('token');
  const [postData, setPostData] = useState(null);
  const [postList, setPostList] = useState([]);

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
        const res = await axios.get(`https://hyeonjo.shop/api/guest?category=${selectedCategory}`);
        if (res.data.isSuccess) {
          const reversedPostList = res.data.data.postList.reverse().map(post => {
            if (post.gender === 'NONE') {
              post.gender = '제한 없음';
            } else if (post.gender === 'FEMALE') {
              post.gender = '여성';
            } else if (post.gender === 'MALE') {
              post.gender = '남성';
            }
            return post;
          });
          setPostList(reversedPostList);
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

  return (
    <div className="home-container">
      {postList.map(({ postId, title, writerNickname, accompaniedDate, personNumMin, personNumMax, gender, hashtagList }, index) => (
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
  );
};

export default CategoryPosting;


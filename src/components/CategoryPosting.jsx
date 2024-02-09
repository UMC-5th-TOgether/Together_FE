import React, { useEffect, useState } from 'react';
import { FaQuoteLeft } from 'react-icons/fa6';
import { FaQuoteRight } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { dummy } from '../CategoryDummy';
import axios from 'axios';

const CategoryPosting = ({ selectedCategory }) => {
  const token = localStorage.getItem('token');
  const [postData, setPostData] = useState(null);

  const navigate = useNavigate();

  const iconStyle = {
    display: 'flex',
    alignItems: 'flex-start',
  };
  const iconStyle2 = {
    display: 'flex',
    alignItems: 'flex-end',
  };

  const filteredPosts = selectedCategory
    ? dummy.results.filter((post) => post.category === selectedCategory).slice(0, 12)
    : dummy.results.slice(0, 8);


  const handleClick = async (postId) => {
    try {
      const res = await axios.get(`https://hyeonjo.shop/api/posts/id?postId=${postId}`, {
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


  // const handleClick = async (postId) => {
  //   navigate(`/postuser/${postId}`);
  // };

  return (
    <div className="home-container">
      {filteredPosts.map(({ id, title, who, date, headcount, gender, hashtag }, index) => (
        <div key={id} className="home-post" onClick={() => handleClick(id)}>
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
              <span className="js-content"> {who}</span>
            </div>
            <div className="js-content-wrap">
              일자
              <span className="js-content"> {date}</span>
            </div>
            <div className="js-content-wrap">
              모집
              <span className="js-content"> {headcount}</span>
            </div>
            <div>
              성별
              <span className="js-content"> {gender}</span>
            </div>
          </div>
          <div className="home-post-hashtag">
            {hashtag.map((tag, tagIndex) => (
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

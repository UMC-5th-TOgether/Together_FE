import React from 'react'
import { FaQuoteLeft } from "react-icons/fa6"
import { FaQuoteRight } from "react-icons/fa6"
import { dummy } from '../CategoryDummy'

const CategoryPosting = () => {
  const iconStyle = {
    display: 'flex',
    alignItems: 'flex-start'
  };
  const iconStyle2 = {
    display: 'flex',
    alignItems: 'flex-end'
  };

  return (
    <div className = "home-container">
      {dummy.results.map(({ title,who, date, headcount, gender, hashtag}, index) => (
        <div key={index} className="home-post">
          <br/>
          <div className="home-post-title">
            <span style={iconStyle}>
              <FaQuoteLeft id="quote-icon"/>
            </span>
            {title}
            <span style={iconStyle2}>
              <FaQuoteRight id="quote-icon"/>
            </span>
          </div>
          <br/>
          <div className="home-post-content">
            <div>
              동행자 
              <span className="js-content"> {who}</span>
              </div>
            <div>
              일자 
              <span className="js-content"> {date}</span>
              </div>
            <div>
              모집 
              <span className="js-content"> {headcount}</span>
              </div>
            <div>
              성별 
              <span className="js-content"> {gender}</span>
              </div>
          </div>
          <div className="home-post-hashtag">
            {hashtag.map((tag,tagIndex)=>(
              <div key = {tagIndex} className="hashtag">#{tag}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryPosting;
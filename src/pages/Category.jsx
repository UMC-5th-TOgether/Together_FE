import React, { useState } from 'react'
import CategoryPagePosting from '../components/CategoryPagePosting'
import { Link } from 'react-router-dom';
import '../style/Category.css'
import categoryImg from '../assets/category.png'
import postingButton from '../assets/posting-button.png'
import CategoryRecentPosting from '../components/CategoryRecentPosting';

export default function Category() {
  const categories = ['공연', '운동', '식사', '취미'];

  const [selectedCategory, setSelectedCategory] = useState('공연');

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  let categoryValue;
  if (selectedCategory === '공연') {
    categoryValue = 'PLAY';
  } else if (selectedCategory === '운동') {
    categoryValue = 'EXERCISE';
  } else if (selectedCategory === '식사') {
    categoryValue = 'EAT';
  } else if (selectedCategory === '취미') {
    categoryValue = 'HOBBY';
  }

  return (
    <>
      <div className="category-page">

        <div className="banner-image-container">
          <img className="banner-image" src={categoryImg} alt="category img" />
        </div>

        <div className="category-button-wrap">

          {categories.map((cat) => (
            <label key={cat}>
              <button
                className={`black-button ${selectedCategory === cat ? 'selected' : ''}`}
                key={cat}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            </label>
          ))}
        </div>
        <br />

        <div className="category-title">인기 포스트</div>

        <CategoryPagePosting selectedCategory={categoryValue} />

        <div className="category-posting-button">
          <Link to="/Posting">
            <img className="category-bottom-button" src={postingButton}></img>
          </Link>
        </div>


        <div className="category-title">최신 포스트</div>

        <CategoryRecentPosting selectedCategory={categoryValue} />

        <div className="category-posting-button">
          <Link to="/Posting">
            <img className="category-bottom-button" src={postingButton}></img>
          </Link>
        </div>
      </div>
    </>
  )
}

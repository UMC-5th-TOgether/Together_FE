import React, { useEffect, useState } from 'react'
import CategoryPagePosting from '../components/CategoryPagePosting'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../style/Category.css'
import categoryImg from '../assets/category.png'
import postingButton from '../assets/posting-button.png'
import CategoryRecentPosting from '../components/CategoryRecentPosting';

export default function Category() {
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');
  const categories = ['공연', '운동', '식사', '취미'];
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    if (!token) {
      alert('로그인이 필요합니다.');
      navigate('/login')
      return;
    }
    if (!selectedCategory) {
      setSelectedCategory('공연');
    }
  }, [], navigate);

  useEffect(() => {
    if (location.state && location.state.selectedCategory) {
      setSelectedCategory(location.state.selectedCategory);
    }
  }, [location.state], navigate);


  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
    navigate(`/category`, { state: { selectedCategory: selectedCategory } });
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

  useEffect(() => {
    console.log(`Current category: ${selectedCategory}`);
  }, [selectedCategory]);

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

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CategoryPosting from '../components/CategoryPosting'



export default function HomeCategory() {
  const [popularCategory, setPopularCategory] = useState('');

  const handleCategoryClick = (category) => {
    setPopularCategory(category);
  // 선택한 카테고리에 따라 인기 포스트를 가져오는 로직을 구현합니다.
  // 예를 들어, API 호출이나 데이터 필터링 등을 수행할 수 있습니다.
};
    return (
    
        <>
        <div className= "Category-Info">
    
            <br/>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                style={{ width: "92px", height: "19px" }}
                src="/Category.png"
                alt="로고"
              />
            </div>
           
            <br/>
            <h1 style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 'bold',fontSize: '1.4rem' }}>
              4가지 카테고리로 원하는 매칭을 찾아보세요 !
            </h1>
            <br/>
          <div className="Category-Container-Wrapper">  
            <div className = "Category-Container">
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctgmeal">식사 
                  <div>
                      <img
                        src="/Arrow.png"
                        alt="로고"
                      />
                  </div>
                </Link>
              </div>
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctgexercise">운동
                  <div>
                      <img
                        src="/Arrow.png"
                        alt="로고"
                      />
                  </div>                
                </Link>
              </div>
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctgconcert">공연
                  <div>
                      <img
                        src="/Arrow.png"
                        alt="로고"
                      />
                  </div>   
                </Link>
              </div>
              <div className="Category-Wrap">
                <Link className="Category-Button" to ="/ctghobby">취미
                  <div>
                      <img
                        src="/Arrow.png"
                        alt="로고"
                      />
                  </div>   
                </Link>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <br/>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                style={{ width: "77px", height: "19px" }}
                src="/Posting.png"
                alt="로고"
              />
          </div>
          <br/>
          <h1 style={{ fontFamily: '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif', fontWeight: 'bold', fontSize: '1.4rem' }}>
            한눈에 보는 카테고리별 인기 포스트
          </h1>
          <br/>
            <div className= "Category-Wrap3">
              <div className="Category-Wrap2">
                <button onClick={() => handleCategoryClick('공연')}>공연</button>
                <button onClick={() => handleCategoryClick('식사')}>식사</button>
                <button onClick={() => handleCategoryClick('운동')}>운동</button>
                <button onClick={() => handleCategoryClick('취미')}>취미</button> 
              </div>
            </div>
        
        </div>
        <br/>
        <br/>
       
        <CategoryPosting/>
    
        </>
      )
}

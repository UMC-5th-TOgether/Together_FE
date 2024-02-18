import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryPosting from "../components/CategoryPosting";
import "../style/Category.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryPosting from "../components/CategoryPosting";
import "../style/Category.css";

export default function HomeCategory() {
  const categories = ["공연", "운동", "식사", "취미"];
  const [selectedCategory, setSelectedCategory] = useState("");

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
      <div className="Category-Info">
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "92px", height: "19px" }}
            src="/Category.png"
            alt="로고"
          />
        </div>

        <br />
        <h1
          style={{
            fontFamily:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
        <h1
          style={{
            fontFamily:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
          4가지 카테고리로 원하는 매칭을 찾아보세요 !
        </h1>
        <br />
        <div className="Category-Container-Wrapper">
          <div className="Category-Container">
            <div className="Category-Wrap">
              <Link className="Category-Button" to="/Category">
                식사
                <div>
                  <img src="/Arrow.png" alt="로고" />
                  <img src="/Arrow.png" alt="로고" />
                </div>
              </Link>
            </div>
            <div className="Category-Wrap">
              <Link className="Category-Button" to="/Category">
                운동
                <div>
                  <img src="/Arrow.png" alt="로고" />
                  <img src="/Arrow.png" alt="로고" />
                </div>
              </Link>
            </div>
            <div className="Category-Wrap">
              <Link className="Category-Button" to="/Category">
                공연
                <div>
                  <img src="/Arrow.png" alt="로고" />
                  <img src="/Arrow.png" alt="로고" />
                </div>
              </Link>
            </div>
            <div className="Category-Wrap">
              <Link className="Category-Button" to="/Category">
                취미
                <div>
                  <img src="/Arrow.png" alt="로고" />
                  <img src="/Arrow.png" alt="로고" />
                </div>
              </Link>
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img
            style={{ width: "77px", height: "19px" }}
            src="/Posting.png"
            alt="로고"
          />
        </div>
        <br />
        <h1
          style={{
            fontFamily:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
        <h1
          style={{
            fontFamily:
              '"Pretendard Variable", Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI", "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif',
            fontWeight: "bold",
            fontSize: "1.4rem",
          }}
        >
          한눈에 보는 카테고리별 인기 포스트
        </h1>
        <br />

        <div className="Category-Wrap3">
          <div className="Category-Wrap2">
            {categories.map((cat) => (
              <label key={cat}>
                <button
                  className={`category-only ${
                    selectedCategory === cat ? "selected" : ""
                  }`}
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              </label>
            ))}
          </div>
        </div>
      </div>
      <br />
      <br />

      <CategoryPosting selectedCategory={selectedCategory} />
    </>
  );
  );
}

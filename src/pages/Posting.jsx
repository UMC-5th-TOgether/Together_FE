// import axios from "axios";
import React, { useState } from 'react';
import postAuthor from '../assets/post-author.png';
import postUpload from '../assets/post-upload.png';
import '../style/Posting.css';
import { Link, useNavigate } from 'react-router-dom';
import { HashTag } from '../elements/HashTag';

export default function Posting() {
  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [recruitmentCount, setRecruitmentCount] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);

  const categories = ['공연', '운동', '식사', '취미'];
  const gender = ['제한 없음', '여성', '남성'];

  const navigate = useNavigate();

  const handleTitleChange = (e) => {
    const newTitle = e.target.value.slice(0, 40);
    setTitle(newTitle);
  };

  const handleCategoryChange = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };

  const handleGenderRestrictionChange = (selectedGender) => {
    setSelectedGender(selectedGender);

  };

  const handleRecruitmentCountChange = (e) => {
    // const newRecruitmentCount = e.target.value.replace(/[^0-9]/g, '');
    // newRecruitmentCount = newRecruitmentCount.slice(0, 3);
    const newRecruitmentCount = e.target.value.slice(0, 3);
    setRecruitmentCount(newRecruitmentCount);
  };

  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }));
      setSelectedImages(prevImages => [...prevImages, ...newImages]);
    }
  };

  const handleRemoveImage = (index) => {
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Selected Images:', selectedImages);

    // const lastPostId = dummy.results[dummy.results.length - 1].id;
    // navigate(`/postuser/${lastPostId}`);

    // const res = await axios.post("http://localhost:8000/", {
    //   title: title,
    //   selectedCategory: selectedCategory,
    //   hashtags: hashtags,
    //   selectedGender: selectedGender,
    //   recruitmentCount: recruitmentCount,
    //   content: content,
    //   images: images
    // });
  };

  return (
    <div className="page">

      <div className="banner-container">
        <img className="banner" src={postAuthor} alt="Posting img" />
      </div>

      <div className="title-wrap">포스트 작성</div>

      <div className="content-wrap">
        <div className="wrap">
          <div className="input-title">제목</div>
          <div className="input-wrap">
            <input
              className="input"
              type="text"
              value={title}
              placeholder="제목은 최대 40자까지 작성 가능합니다."
              onChange={handleTitleChange}
              style={{ width: '350px' }} />
          </div>
        </div>
        <br />

        <div className="wrap">
          <div className="input-title">카테고리</div>
          <div className="input-button category-buttons">
            {categories.map((cat) => (
              <label key={cat}>
                <button
                  className={`category-buttons ${selectedCategory === cat ? 'selected' : ''}`}
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              </label>
            ))}
          </div>
        </div>
        <br />

        <div className="wrap">
          <div className="input-title">해시태그</div>
          {/* <button type="button">+</button> */}
          <HashTag />
        </div>

        <div className="wrap">
          <div className="input-title">성별 제한</div>
          <div className="input-button gender-buttons">
            {gender.map((gen) => (
              <label key={gen}>
                <button
                  className={`gender-buttons ${selectedGender === gen ? 'selected' : ''}`}
                  key={gen}
                  onClick={() => handleGenderRestrictionChange(gen)}
                >
                  {gen}
                </button>
              </label>
            ))}
          </div>
        </div>
        <br />

        <div className="wrap">
          <div className="input-title">모집 인원</div>
          <div className="input-wrap" style={{ width: '35px' }}>
            <input
              className="input"
              type="text"
              // pattern="[0-9]+"
              value={recruitmentCount}
              onChange={handleRecruitmentCountChange}
              style={{ width: '30px' }} />
          </div>
          <div className="input-message">명~</div>
        </div>
        <br />

        <div className="input-title">글 쓰기</div>
        <div>
          <textarea
            className="input"
            value={content}
            placeholder="매칭 시, 실제로 인증된 나이 / 성별 및 프로필이 상대방에게 자동적으로 전달됩니다.&#13;SNS 계정, 전화번호 등 개인정보는 입력하지 않도록 주의하세요."
            onChange={(e) => setContent(e.target.value)}
            style={{ height: '100px', resize: 'none' }}
          />
        </div>
        <br />

        <div className="input-wrap">
          <input
            // value={comment}
            placeholder="댓글을 남겨보세요."
            // onChange={(e) => setComment(e.target.value)}
            style={{ height: '40px' }} />
        </div>
        <br />
        <br />

        <div className="input-title">이미지</div>
        <div className="images-wrap">
          <input
            id="imageInput"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        {selectedImages.map((image, index) => (
          <div key={index} className="image-preview">
            <button className="remove-image-button" onClick={() => handleRemoveImage(index)}>x</button>
            <img src={image.preview} alt={`Selected ${index + 1}`} className="selected-image" />
          </div>
        ))}
      </div>


      <div className="upload">
        <Link to="/postuser/:id" onClick={handleSubmit}>
          <img className="bottom-button" src={postUpload}></img>
        </Link>
        {/* <button className="bottom-button" type="submit">업로드 →</button> */}
      </div>
    </div>
  );
};

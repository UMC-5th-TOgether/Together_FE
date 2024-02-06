import axios from "axios";
import React, { useState } from 'react';
import postAuthor from '../assets/post-author.png';
import postUpload from '../assets/post-upload-button.png';
import '../style/Posting.css';
import { Link, useNavigate } from 'react-router-dom';
import { HashTag } from '../elements/HashTag';
import { dummy } from "../PostUserDummy";

export default function Posting() {
  const token = localStorage.getItem('token');
  console.log(token);

  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [recruitmentCount, setRecruitmentCount] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  const categories = ['공연', '운동', '식사', '취미'];
  const gender = ['제한 없음', '여성', '남성'];

  let genderValue;
  if (selectedGender === '제한 없음') {
    genderValue = 'NONE';
  } else if (selectedGender === '여성') {
    genderValue = 'FEMALE';
  } else if (selectedGender === '남성') {
    genderValue = 'MALE';
  }

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
    const newRecruitmentCount = e.target.value.replace(/\D/g, '').slice(0, 3);
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

  const handleHashTagsChange = (tags) => {
    setHashtags(tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Title:', title);
    console.log('Content:', content);
    console.log('Categories:', selectedCategory);
    console.log('recruitmentCount:', recruitmentCount);
    console.log('Hashtags:', hashtags);

    const lastPostId = dummy.results[dummy.results.length - 1].id;
    navigate(`/postuser/${lastPostId}`);


    const userData = {
      title: title,
      category: categoryValue,
      postHashtagList: hashtags,
      gender: genderValue,
      personNum: parseInt(recruitmentCount),
      content: content,
      status: "ING"
    }
    try {
      const res = await axios.post("http://hyeonjo.shop/api/posts",
        // const res = await axios.post("https://hyunjin.link/api/posts",
        userData
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("Response:", res.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="posting-page">

      <div className="banner-image-container">
        <img className="banner-image" src={postAuthor} alt="Posting img" />
      </div>

      <div className="posting-post">
        <div className="posting-title-wrap">포스트 작성</div>

        <div className="posting-content-wrap">
          <div className="posting-wrap">
            <div className="posting-input-title">제목</div>
            <div className="posting-input-wrap">
              <input
                className="posting-input"
                type="text"
                value={title}
                placeholder="제목은 최대 40자까지 작성 가능합니다."
                onChange={handleTitleChange}
                style={{ width: '800px' }} />
            </div>
          </div>
          <br />

          <div className="posting-wrap">
            <div className="posting-input-title">카테고리</div>
            <div className="posting-input-button posting-category-buttons">
              {categories.map((cat) => (
                <label key={cat}>
                  <button
                    className={`posting-category-buttons ${selectedCategory === cat ? 'selected' : ''}`}
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

          <div className="posting-wrap">
            <div className="posting-input-title">해시태그</div>
            {/* <button type="button">+</button> */}
            <HashTag onHashTagsChange={handleHashTagsChange} />
          </div>

          <div className="posting-wrap">
            <div className="posting-input-title">성별 제한</div>
            <div className="iposting-nput-button posting-gender-buttons">
              {gender.map((gen) => (
                <label key={gen}>
                  <button
                    className={`posting-gender-buttons ${selectedGender === gen ? 'selected' : ''}`}
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

          <div className="posting-wrap">
            <div className="posting-input-title">모집 인원</div>
            <div className="posting-input-wrap" style={{ width: '35px' }}>
              <input
                className="posting-input"
                type="text"
                value={recruitmentCount}
                onChange={handleRecruitmentCountChange}
                style={{ width: '30px' }} />
            </div>
            <p className="posting-input-p">명~</p>
          </div>
          <br />

          <div className="posting-input-title">글 쓰기</div>
          <div className="posting-input-wrap" style={{ width: '1220px', height: '150px' }}
          >
            <textarea
              className="posting-input"
              value={content}
              placeholder="매칭 시, 실제로 인증된 나이 / 성별 및 프로필이 상대방에게 자동적으로 전달됩니다.&#13;SNS 계정, 전화번호 등 개인정보는 입력하지 않도록 주의하세요."
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '1220px', height: '150px' }}
            />
          </div>
          <br />

          <div className="posting-input-title">이미지</div>
          <div className="posting-images-wrap">
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
            />
          </div>
          {selectedImages.map((image, index) => (
            <div key={index} className="posting-image-preview">
              <button className="remove-image-button" onClick={() => handleRemoveImage(index)}>x</button>
              <img src={image.preview} alt={`Selected ${index + 1}`} className="posting-selected-image" />
            </div>
          ))}
        </div>
      </div>
      <div className="posting-upload">
        <Link to="/postuser/:id" onClick={handleSubmit}>
          <img className="posting-bottom-button" src={postUpload}></img>
        </Link>
      </div>
    </div>
  );
};

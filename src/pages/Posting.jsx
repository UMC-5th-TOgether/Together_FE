import axios from "axios";
import React, { useEffect, useState } from 'react';
import postAuthor from '../assets/post-author.png';
import postUpload from '../assets/post-upload-button.png';
import '../style/Posting.css';
import { Link, useNavigate } from 'react-router-dom';
import { HashTag } from '../elements/HashTag';
import { dummy } from "../PostUserDummy";

export default function Posting() {
  const token = localStorage.getItem('token');

  const [title, setTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedGender, setSelectedGender] = useState('');
  const [personMin, setPersonMin] = useState('');
  const [personMax, setPersonMax] = useState('');
  const [content, setContent] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [hashtags, setHashtags] = useState([]);
  const [meetingYear, setMeetingYear] = useState('');
  const [meetingMonth, setMeetingMonth] = useState('');
  const [meetingDay, setMeetingDay] = useState('');
  const [meetTime, setMeetTime] = useState('');


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


  const handleMeetingYearChange = (e) => {
    const newMeetingYear = e.target.value.replace(/\D/g, '').slice(0, 4);
    setMeetingYear(newMeetingYear);
  };

  const handleMeetingMonthChange = (e) => {
    const newMeetingMonth = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMeetingMonth(newMeetingMonth);
  };

  const handleMeetingDayChange = (e) => {
    const newMeetingDay = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMeetingDay(newMeetingDay);
  };


  const handlePersonMinChange = (e) => {
    const newRecruitmentCount = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPersonMin(newRecruitmentCount);
  };

  const handlePersonMaxChange = (e) => {
    const newRecruitmentCount = e.target.value.replace(/\D/g, '').slice(0, 3);
    setPersonMax(newRecruitmentCount);
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

  const handleRemoveImage = (e, index) => {
    e.stopPropagation();
    const newImages = [...selectedImages];
    newImages.splice(index, 1);
    setSelectedImages(newImages);
  };


  const handleHashTagsChange = (tags) => {
    setHashtags(tags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(token);
    if (!token) {
      alert('로그인이 필요합니다.');
      return;
    }

    let formattedMeetTime = `${meetingYear}-${meetingMonth}-${meetingDay}`;
    formattedMeetTime = formattedMeetTime.replace(/-(\d)(?!\d)/g, '-0$1');

    const postingData = {
      title: title,
      category: categoryValue,
      postHashtagList: hashtags,
      gender: genderValue,
      personNumMin: parseInt(personMin),
      personNumMax: parseInt(personMax),
      meetTime: formattedMeetTime,
      content: content,
    }
    console.log(meetTime);

    try {
      const res = await axios.post("https://hyeonjo.shop/api/posts",
        postingData
        ,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      console.log("Response:", res.data);

      if (res.data.isSuccess) {
        const formData = new FormData();

        formData.append('post', res.data.data.id);

        selectedImages.forEach(image => {
          formData.append('files', image.file);
        });

        axios.post('https://hyeonjo.shop/api/posts/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => {
            console.log(response.data);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
      setTimeout(() => {
        navigate(`/category`, { state: { selectedCategory: categoryValue } });
      }, 1500);

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
                    className={`category-only ${selectedCategory === cat ? 'selected' : ''}`}
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
            <div className="posting-input-title">동행 일자</div>
            <div className="posting-input-wrap">
              <input
                className="posting-input"
                type="text"
                value={meetingYear}
                onChange={(e) => { handleMeetingYearChange(e) }}
                style={{ width: '40px' }}
              />
            </div>
            <p className="posting-input-p">년</p>

            <div className="posting-input-wrap">
              <input
                className="posting-input"
                type="text"
                value={meetingMonth}
                onChange={(e) => { handleMeetingMonthChange(e) }}
                style={{ width: '20px' }}
              />
            </div>
            <p className="posting-input-p">월</p>

            <div className="posting-input-wrap">
              <input
                className="posting-input"
                type="text"
                value={meetingDay}
                onChange={(e) => { handleMeetingDayChange(e) }}
                style={{ width: '20px' }}
              />
            </div>
            <p className="posting-input-p">일</p>
          </div>

          <div className="posting-wrap">
            <div className="posting-input-title">성별 제한</div>
            <div className="iposting-nput-button posting-gender-buttons">
              {gender.map((gen) => (
                <label key={gen}>
                  <button
                    className={`category-only ${selectedGender === gen ? 'selected' : ''}`}
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
                value={personMin}
                onChange={handlePersonMinChange}
                style={{ width: '30px' }} />
            </div>
            <p className="posting-input-p">명~</p>

            <div className="posting-input-wrap" style={{ width: '35px' }}>
              <input
                className="posting-input"
                type="text"
                value={personMax}
                onChange={handlePersonMaxChange}
                style={{ width: '30px' }} />
            </div>
            <p className="posting-input-p">명</p>
          </div>
          <br />

          <div className="posting-input-title">글 쓰기</div>
          <div className="posting-input-wrap" style={{ width: '1220px', height: '150px' }}
          >
            <textarea
              className="posting-input"
              value={content}
              placeholder="매칭 시, 실제로 인증된 나이 / 성별 및 프로필이 상대방에게 자동적으로 전달됩니다.&#13;SNS 계정, 전화번호 등 개인정보는 입력하지 않도록 주의하세요.&#13;최대 300자까지 작성 가능합니다."
              maxLength="300"
              onChange={(e) => setContent(e.target.value)}
              style={{ width: '1220px', height: '150px' }}
            />
          </div>
          <br />


          <div className="posting-input-title">이미지</div>
          <div
            className="matching-images-wrap"
            onClick={() => document.getElementById("imageInput").click()}
          >
            {selectedImages.map((image, index) => (
              <div key={index} className="matching-image-preview">
                <button className="remove-image-button" onClick={(e) => handleRemoveImage(e, index)}>x</button>
                <img src={image.preview} alt={`Selected ${index + 1}`} className="matching-selected-image" />
              </div>
            ))}
            {!selectedImages.length > 0 && (
              <label className="matching-image-label">
                이미지 추가하기
              </label>
            )}
            <input
              id="imageInput"
              type="file"
              accept="image/*"
              multiple
              style={{ display: 'none' }}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>
      <div className="posting-upload">
        <Link to="/category" onClick={handleSubmit}>
          <img className="posting-bottom-button" src={postUpload}></img>
        </Link>
      </div>
    </div>
  );
};

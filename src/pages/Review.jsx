import axios from "axios";
import React, { useEffect, useState } from 'react';
import review from '../assets/review.png';
import postUpload from '../assets/post-upload-button.png';
import '../style/Posting.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaStar } from "react-icons/fa";

export default function Review() {
    const token = localStorage.getItem('token');

    const [title, setTitle] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedStars, setSelectedStars] = useState(0);


    const categories = ['다시 만나고 싶어요👍', '다시 만나고 싶지 않아요👎'];

    const ARRAY = [0, 1, 2, 3, 4];


    const handleStarClick = (index) => {
        setSelectedStars(index + 1);
    };


    let categoryValue;
    if (selectedCategory === '다시 만나고 싶어요') {
        categoryValue = 0;
    } else if (selectedCategory === '다시 만나고 싶지 않아요') {
        categoryValue = 1;
    }

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        const newTitle = e.target.value.slice(0, 40);
        setTitle(newTitle);
    };

    const handleCategoryChange = (selectedCategory) => {
        setSelectedCategory(selectedCategory);
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


    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(token);
        if (!token) {
            alert('로그인이 필요합니다.');
            return;
        }

        const postingData = {
            title: title,
            category: categoryValue,
            content: content,
        }

        try {
            const res = await axios.post("https://hyeonjo.shop/api/review",
                postingData
                ,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );

            // const id = res.data.data.id;
            console.log("Response:", res.data);
            // navigate(`/postuser/${id}`);
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
                <img className="banner-image" src={review} alt="Review img" />
            </div>

            <div className="posting-post">
                <div className="posting-title-wrap">후기 작성</div>

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
                        <div className="posting-input-title">다시 만남</div>
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
                        <div className="posting-input-title">별점</div>
                        <span className="review-fastar">
                            {ARRAY.map((el, index) => (
                                <FaStar
                                    key={index}
                                    size="18"
                                    color={index < selectedStars ? "#007bff" : "#e4e5e9"}
                                    onClick={() => handleStarClick(index)}
                                    style={{ cursor: 'pointer' }}
                                />
                            ))}
                        </span>
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
                        <label className="matching-image-label">
                            이미지 추가하기
                        </label>
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

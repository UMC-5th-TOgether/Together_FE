import React, { useState } from 'react';
import matchingSend from '../assets/matching-send.png';
import matchingSendButton from '../assets/matching-send-button.png';
import '../style/Matching.css';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';

export default function MatchingSend() {
    const token = localStorage.getItem('token');

    const location = useLocation();
    const { postDataWriter } = location.state;

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);

    const handleTitleChange = (e) => {
        const newTitle = e.target.value.slice(0, 20);
        setTitle(newTitle);
    };

    const handleContentChange = (e) => {
        const newContent = e.target.value;
        setContent(newContent);
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

    const handleSubmit = () => {
        const formData = new FormData();

        selectedImages.forEach(image => {
            formData.append('requestImages', image.file);
        });

        let jsonData = JSON.stringify({ receiverId: postDataWriter.id, title: title, content: content });

        let blob = new Blob([jsonData], { type: 'application/json' });

        formData.append('request', blob, 'data.json');

        axios.post('https://hyeonjo.shop/api/matching', formData, {
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
    };

    return (
        <div className="matching-page">
            <div className="banner-image-container">
                <img className="banner-image" src={matchingSend} alt="MatchingSend img" />
            </div>

            <div className="posting-post">

                <div className="posting-title-wrap">매칭 신청</div>

                <div className="posting-content-wrap">
                    <div className="posting-wrap">
                        <div className="posting-input-title">제목</div>
                        <div className="posting-input-wrap" style={{ width: '1120px' }}>
                            <input
                                className="posting-input"
                                type="text"
                                value={title}
                                placeholder="소개글 제목은 최대 20자까지 작성 가능합니다."
                                onChange={handleTitleChange}
                            />
                        </div>
                    </div>

                    <div className="posting-input-title">글 쓰기</div>
                    <div className="posting-input-wrap" style={{ width: '1220px', height: '150px' }}>
                        <textarea
                            className="posting-input"
                            value={content}
                            placeholder="매칭 시, 실제로 인증한 나이 / 성별 및 프로필이 상대방에게 자동적으로 전달됩니다.&#13;SNS 계정, 전화번호 등 개인 정보는 입력하지 않도록 주의해주세요."
                            onChange={handleContentChange}
                            style={{ width: '1220px', height: '150px' }}
                        />
                    </div>
                </div>

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
                        <label className="posting-image-label">
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
            <div className="posting-upload">
                <Link to='/' onClick={handleSubmit}>
                    <img className="posting-bottom-button" src={matchingSendButton}></img>
                </Link>
            </div>
        </div>
    );
};

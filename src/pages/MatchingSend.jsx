import React, { useState } from 'react';
import matchingSend from '../assets/matching-send.png';
import '../style/Matching.css';

export const MatchingSend = () => {
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

    const handleRemoveImage = (index) => {
        const newImages = [...selectedImages];
        newImages.splice(index, 1);
        setSelectedImages(newImages);
    };

    const handleSubmit = () => {
        console.log('Title:', title);
        console.log('Content:', content);
        console.log('Selected Images:', selectedImages);
    };

    return (
        <div className="matching-page">
            <div className="banner-container">
                <img className="banner" src={matchingSend} alt="Posting img" />
            </div>

            <div className="matching-title-wrap">매칭 신청하기</div>

            <div className="matching-content-wrap">
                <div className="matching-input-wrap">
                    <input
                        className="matching-input"
                        type="text"
                        value={title}
                        placeholder="소개글 제목은 최대 20자까지 작성 가능합니다."
                        onChange={handleTitleChange}
                    />
                    <button
                        onClick={handleSubmit}
                        className="matching-upload-button"
                        disabled={title.trim() === '' || selectedImages.length === 0}>
                        전송
                    </button>
                </div>
                <hr />

                <div className="matching-input-wrap">
                    <textarea
                        className="matching-input"
                        value={content}
                        placeholder="매칭 시, 실제로 인증한 나이 / 성별 및 프로필이&#13;&#13;상대방에게 자동적으로 전달됩니다.&#13;&#13;SNS 계정, 전화번호 등 개인 정보는 입력하지 않도록&#13;&#13;주의해주세요."
                        onChange={handleContentChange}
                        style={{ height: '140px' }}
                    />
                </div>
            </div>

            <div
                className="matching-images-wrap"
                onClick={() => document.getElementById("imageInput").click()}
            >
                {selectedImages.map((image, index) => (
                    <div key={index} className="matching-image-preview">
                        <button className="remove-image-button" onClick={() => handleRemoveImage(index)}>x</button>
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
    );
};

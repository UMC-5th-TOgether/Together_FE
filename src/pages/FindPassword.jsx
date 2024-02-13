import axios from "axios";
import React, { useEffect, useState } from "react";
import { validateEmail } from '../util/SignUpValidation';
import { Link, useNavigate } from 'react-router-dom';
import LoginBanner from '../assets/login.png'
import '../style/Login.css';

export default function FindPassword() {
    const navigate = useNavigate();

    const [email, setEmail] = useState('');

    const [emailError, setEmailError] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const handleEmail = (e) => {
        const value = e.target.value;
        setEmail(value);
        if (!validateEmail(value)) {
            setEmailError('올바른 이메일을 입력하세요.');
        } else {
            setEmailError('');
        }
    };

    const onClickConfirmButton = async (e) => {
        if (email === '') {
            alert('이메일을 입력해주세요.');
            return;
        }

        console.log(emailError)
        if (emailError) {
            alert('양식을 올바르게 입력하세요.');
            return;
        }

        try {
            setIsLoading(true);

            setTimeout(() => {
                setIsLoading(false);
                navigate('/');
            }, 1500);
        }
        catch (err) {
            alert(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="banner-image-container">
                <img className="banner-image" src={LoginBanner} alt="Login img" />
            </div>
            <br />

            <div className="login-content-wrap">

                <div className="login-title-wrap">비밀번호 찾기</div>

                <div className="login-input-title">이메일</div>
                <div className="login-input-wrap">
                    <input
                        className="login-input"
                        type="text"
                        value={email}
                        placeholder="이메일을 입력하세요."
                        onChange={handleEmail}
                    />
                </div>
                {emailError && <div className="error">{emailError}</div>}

                <button onClick={onClickConfirmButton} className="login-bottom-button" disabled={isLoading}>
                    {isLoading ? 'Loading...' : '비밀번호 재설정 링크 보내기'}
                </button>
            </div>
        </div>
    );
}

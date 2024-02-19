import React, { useEffect, useState } from "react";
import axios from "axios";
import SignUpBanner from '../assets/sign-up.png';
import '../style/Login.css';
import { useNavigate } from "react-router-dom";

export default function SignUpAuthenticationCheck() {
    const navigate = useNavigate();

    const [verificationCode, setVerificationCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const handleVerificationCode = (e) => {
        const value = e.target.value;
        setVerificationCode(value);
    };

    const closeModal = () => {
        setModalOpen(false);
        setTimeout(() => {
            navigate('/login');
        }, 600);
    };

    const onClickConfirmButton = async (e) => {
        if (verificationCode === '') {
            alert('인증번호를 입력해주세요.');
            return;
        }

        try {
            setIsLoading(true);

            // if (res.data.isSuccess) {
            //     setIsLoading(false);
            //     setModalOpen(true);
            // } else {
            //     setIsLoading(false);
            //     alert(res.data.message);
            // }

            setTimeout(() => {
                setIsLoading(false);
                setModalOpen(true);
            }, 1500);
        } catch (err) {
            alert(err);
            setIsLoading(false);
        }
    };

    return (
        <div className="login-page login-page-authentication">
            <div className="banner-image-container">
                <img className="banner-image" src={SignUpBanner} alt="SignUp img" />
            </div>
            <br />

            <div className="login-content-wrap">
                <div className="login-input-title">인증번호</div>
                <div className="login-input-wrap">
                    <input
                        className="login-input"
                        type="text"
                        value={verificationCode}
                        placeholder="전송된 인증번호를 입력하세요."
                        onChange={handleVerificationCode}
                    />
                </div>

                <button onClick={onClickConfirmButton} className="login-bottom-button" disabled={isLoading}>
                    {isLoading ? 'Loading...' : '다음'}
                </button>
            </div>

            {modalOpen &&
                <div className="modal">
                    <div className="signup-modal-content">
                        회원가입이 완료되었습니다!<br />투게더와 함께 지금 바로 동반인을 구해보세요!
                        <button to='/login' className="login-bottom-button" onClick={closeModal}>확인</button>
                    </div>
                </div>
            }
        </div>
    );
}

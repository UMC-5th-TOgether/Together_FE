import React, { useState } from "react";
import { validateEmail, validatePw, validateNickname } from '../util/SignUpValidation';
import { Link } from 'react-router-dom';
import googleIcon from '../assets/google-icon.png';
import naverIcon from '../assets/naver-icon.png';
import kakaoIcon from '../assets/kakao-icon.png';
import '../style/Login.css';
import { GoogleLoginButton, KakaoLoginButton, NaverLoginButton } from "../util/SocialLogin";

export default function SignUp() {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [nicknameError, setNicknameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [pwError, setPwError] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const handleNickname = (e) => {
    const value = e.target.value;
    setNickname(value);
    if (!validateNickname(value)) {
      setNicknameError('2글자 이상 8글자 이하로 입력해주세요.');
    } else {
      setNicknameError('');
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!validateEmail(value)) {
      setEmailError('올바른 이메일을 입력하세요.');
    } else {
      setEmailError('');
    }
  };

  const handlePw = (e) => {
    const value = e.target.value;
    setPw(value);
    if (!validatePw(value)) {
      setPwError('영문, 숫자, 특수기호 조합으로 8자리 이상 입력해주세요.');
    } else {
      setPwError('');
    }
  };

  const onClickConfirmButton = async (e) => {
    if (email === '' || pw === '' || nickname === '') {
      alert('닉네임, 이메일, 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      // const res = await axios.post("http://localhost:8000/user/register", {
      //   email: email,
      //   pw: pw,
      //   nickname: nickname,
      // });

      // if (res.data.isSuccess) {
      //   alert("회원가입에 성공했습니다.");
      // }

      setTimeout(() => {
        setIsLoading(false);
        alert("회원가입에 성공했습니다.");
      }, 1500);
    }
    catch (err) {
      alert(err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-title-wrap">Sign up for an account</div>
      <div className="login-message">투게더와 함께 지금 바로 동반인을 구해보세요!</div>

      <div className="login-content-wrap">
        <div className="login-input-title">Nickname</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="text"
            value={nickname}
            placeholder="닉네임을 입력하세요."
            onChange={handleNickname}
          />
        </div>
        {nicknameError && <div className="error">{nicknameError}</div>}

        <div className="login-input-title">Email</div>
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

        <div className="login-input-title">Password</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="password"
            value={pw}
            placeholder="비밀번호를 입력하세요."
            onChange={handlePw}
          />
        </div>
        {pwError && <div className="error">{pwError}</div>}

        <div>
          <div className="to-login">
            <span>이미 계정이 있으신가요? <a href="/login">Log in</a> </span>
          </div>
          <button onClick={onClickConfirmButton} className="login-bottom-button" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Sign Up'}
          </button>
        </div>

        <div className="social-login">
          <Link onClick={GoogleLoginButton}>
            <img src={googleIcon} alt="google" />
          </Link>
          <Link onClick={NaverLoginButton}>
            <img src={naverIcon} alt="naver" />
          </Link>
          <Link onClick={KakaoLoginButton}>
            <img src={kakaoIcon} alt="kakao" />
          </Link>
        </div>
      </div>
    </div>
  );
}

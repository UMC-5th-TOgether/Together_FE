import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserPassword } from "../store/LoginActions";
import { Link, useNavigate } from 'react-router-dom';
import googleIcon from '../assets/google-icon.png';
import naverIcon from '../assets/naver-icon.png';
import kakaoIcon from '../assets/kakao-icon.png';
import LoginBanner from '../assets/login.png'
import '../style/Login.css';
import { GoogleLoginButton, KakaoLoginButton, NaverLoginButton } from "../util/SocialLogin";
import { setIsLoggedIn } from "../store/LoginReducer";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const pw = useSelector((state) => state.login.pw);
  const [isLoading, setIsLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedIsLoggedIn) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleEmail = (e) => {
    dispatch(setUserEmail(e.target.value));
  };

  const handlePw = (e) => {
    dispatch(setUserPassword(e.target.value));
  };

  const handleKeepLoggedIn = (e) => {
    setKeepLoggedIn(e.target.checked);
  };

  const onClickConfirmButton = async (e) => {
    if (email === '' || pw === '') {
      alert('이메일과 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      setIsLoading(true);

      // const res = await axios.post("https://hyunjin.link/api/auth/login", {
      const res = await axios.post("https://hyeonjo.shop/api/auth/login", {
        email: email,
        password: pw
      });
      if (res.data.isSuccess) {
        setTimeout(() => {
          const token = res.data.data[0].token;

          setIsLoading(false);
          alert("로그인에 성공했습니다.");
          localStorage.setItem('token', token);
          // setAuthHeader(token);
          dispatch(setIsLoggedIn(true));
          navigate('/');

          if (keepLoggedIn) { // 로그인 상태 유지
            localStorage.setItem('isLoggedIn', 'true');
            dispatch(setIsLoggedIn(true));
          }
        }, 1500);
      } else {
        setIsLoading(false);
        alert(res.data.message);
      }

      // alert("로그인에 성공했습니다.");
      // setTimeout(() => {
      //   setIsLoading(false);
      //   navigate('/');
      //   dispatch(setIsLoggedIn(true));

      //   if (keepLoggedIn) { // 로그인 상태 유지
      //     dispatch(setIsLoggedIn(true));
      //   }
      // }, 1500);
    }
    catch (err) {
      alert(err);
      setIsLoading(false);
    }

    dispatch(setUserEmail(''));
    dispatch(setUserPassword(''));
  };

  return (
    <div className="login-page">

      <div className="banner-image-container">
        <img className="banner-image" src={LoginBanner} alt="Login img" />
      </div>

      <div className="login-content-wrap">

        <div className="login-title-wrap">로그인</div>

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

        <div className="login-input-title">비밀번호</div>
        <div className="login-input-wrap">
          <input
            className="login-input"
            type="password"
            value={pw}
            placeholder="비밀번호를 입력하세요."
            onChange={handlePw}
          />
        </div>

        <div className="check-box">
          <input
            type="checkbox"
            checked={keepLoggedIn}
            onChange={handleKeepLoggedIn}
          />
          <label> 로그인 상태 유지 </label>
        </div>

        <div>
          <button onClick={onClickConfirmButton} className="login-bottom-button" disabled={isLoading}>
            {isLoading ? 'Loading...' : '로그인'}
          </button>
          <div className="additional-links">
            <span><a href="/findEmail">계정 찾기</a> | </span>
            <span><a href="/findPassword">비밀번호 찾기</a> | </span>
            <span><a href="/signup">회원가입</a></span>
          </div>
        </div>

        <div className="social-login">
          <Link onClick={GoogleLoginButton}>
            <img src={googleIcon} alt="google" />
          </Link>
          {/* <Link onClick={NaverLoginButton}>
            <img src={naverIcon} alt="naver" />
          </Link> */}
          <Link onClick={KakaoLoginButton}>
            <img src={kakaoIcon} alt="kakao" />
          </Link>
        </div>
      </div>
    </div>

  );
}

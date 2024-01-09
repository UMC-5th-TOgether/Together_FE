// import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserEmail, setUserPassword } from "../store/LoginActions";
import { Link } from 'react-router-dom';
import googleIcon from '../assets/google-icon.png';
import naverIcon from '../assets/naver-icon.png';
import kakaoIcon from '../assets/kakao-icon.png';
import '../style/Login.css';
import GoogleLoginButton from "../util/GoogleLogin";

export default function Login() {
  const dispatch = useDispatch();
  const email = useSelector((state) => state.login.email);
  const pw = useSelector((state) => state.login.pw);
  const [isLoading, setIsLoading] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);

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

      // const res = await axios.post("http://localhost:8000/user/login", {
      //   email: email,
      //   pw: pw,
      // });

      // if (res.data.isSuccess) {
      //   alert("로그인에 성공했습니다.");
      //   localStorage.setItem('token', res.data.result.AccessToken);
      //   localStorage.setItem('email', res.data.result.userEmail);
      // }

      // 통신 완료 후 로딩 해제
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
    catch (err) {
      alert("아이디 또는 비밀번호가 틀렸습니다.");
    }
  };

  return (
    <div className="page">

      <div className="title-wrap">Log in for an account</div>
      <div className="message">투게더에 돌아오신 것을 환영해요!</div>

      <div className="content-wrap">
        <div className="input-title">Email</div>
        <div className="input-wrap">
          <input
            className="input"
            type="text"
            value={email}
            placeholder="이메일을 입력하세요."
            onChange={handleEmail}
          />
        </div>

        <div className="input-title">Password</div>
        <div className="input-wrap">
          <input
            className="input"
            type="password"
            value={pw}
            placeholder="비밀번호를 입력하세요."
            onChange={handlePw}
          />
        </div>
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
        <button onClick={onClickConfirmButton} className="bottom-button" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Log in'}
        </button>
        <div className="additional-links">
          <span><a href="/">계정 찾기</a> | </span>
          <span><a href="/">비밀번호 찾기</a> | </span>
          <span><a href="/signup">회원가입</a></span>
        </div>
      </div>

      <div className="social-login">
        <Link onClick={GoogleLoginButton}>
          <img src={googleIcon} alt="google" />
        </Link>
        <Link to="/">
          <img src={naverIcon} alt="naver" />
        </Link>
        <Link to="/">
          <img src={kakaoIcon} alt="kakao" />
        </Link>
      </div>
    </div>
  );
}
